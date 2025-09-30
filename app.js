// Handle logo images - hide if not found
document.addEventListener('DOMContentLoaded', () => {
  const logos = document.querySelectorAll('.header-logo');
  logos.forEach(logo => {
    logo.addEventListener('error', function() {
      this.style.display = 'none';
    });
  });
  
  // Check if mainApp is visible, if so initialize map immediately
  const mainApp = document.getElementById('mainApp');
  if (mainApp && mainApp.style.display !== 'none') {
    // Map will initialize normally
  }
});

// Initialize map
(function initMap() {
  /** Arar City center */
  const ARAR_CENTER = [30.9753, 41.0389];

  const map = L.map("map", {
    center: ARAR_CENTER,
    zoom: 13, // Start with city view
    zoomControl: true,
    preferCanvas: false,
    minZoom: 11,
    maxZoom: 18,
    zoomAnimation: true,
    fadeAnimation: true,
    markerZoomAnimation: true
  });
  
  // Store map reference globally for splash screen
  window.investmentMap = map;
  window.ARAR_CENTER = ARAR_CENTER; // Store center globally

  // Basemap (light)
  const tiles = L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap contributors, &copy; CARTO"
  });
  tiles.addTo(map);

  // TEMP visual anchor to verify map renders
  L.circleMarker(ARAR_CENTER, { radius: 4, color: '#006c35', fillColor: '#00a86b', fillOpacity: 0.9 }).addTo(map);

  // State
  let plotsLayer = null;
  let currentFilters = {
    district: "all",
    investmentStatus: "all",
    projectType: "all",
    minArea: null,
    maxArea: null
  };

  // UI refs
  const districtSelect = document.getElementById("districtSelect");
  const statusSelect = document.getElementById("statusSelect");
  const typeSelect = document.getElementById("typeSelect");
  const statusSegContainer = document.querySelector('.segmented[aria-label="investment status"]');
  const typeSegContainer = document.querySelector('.segmented[aria-label="project type"]');
  const minAreaInput = null;
  const maxAreaInput = null;
  const areaMinRange = document.getElementById("areaMinRange");
  const areaMaxRange = document.getElementById("areaMaxRange");
  const areaMinVal = document.getElementById("areaMinVal");
  const areaMaxVal = document.getElementById("areaMaxVal");
  const applyBtn = document.getElementById("applyFilters");
  const resetBtn = document.getElementById("resetFilters");

  const statCount = document.getElementById("statCount");
  const statArea = document.getElementById("statArea");
  const statInvestment = document.getElementById("statInvestment");

  // Info card refs
  const infoTitle = document.getElementById("infoTitle");
  const infoPlotNumber = document.getElementById("infoPlotNumber");
  const infoPlanNumber = document.getElementById("infoPlanNumber");
  const infoDistrict = document.getElementById("infoDistrict");
  const infoArea = document.getElementById("infoArea");
  const infoSize = document.getElementById("infoStatus");
  const infoInvest = document.getElementById("infoStatus");
  const infoImages = document.getElementById("infoImages");
  const imageViewer = document.getElementById('imageViewer');
  const viewerImg = document.getElementById('viewerImg');

  // Populate districts from data
  const districts = Array.from(new Set(PLOTS_GEOJSON.features.map(f => f.properties.district))).sort();
  for (const d of districts) {
    const opt = document.createElement("option");
    opt.value = d;
    opt.textContent = d;
    districtSelect.appendChild(opt);
  }

  function formatArea(value) {
    if (!Number.isFinite(value)) return "0 م²";
    return new Intl.NumberFormat("ar-SA").format(Math.round(value)) + " م²";
  }

  function computeStats(features) {
    const count = features.length;
    const totalArea = features.reduce((sum, f) => sum + (f.properties.area || 0), 0);
    const investmentCount = features.filter(f => f.properties.investmentStatus === 'مستثمر').length;
    return { count, totalArea, investmentCount };
  }

  function getFeatureStyle(feature) {
    const status = feature.properties.investmentStatus; // مستثمر | غير مستثمر | قيد الطرح
    const type = feature.properties.projectType; // كبري | ناشئة | متوسطة | مشاريع الخصخصة
    
    // Color based on investment status
    let fillColor, borderColor;
    if (status === 'مستثمر') {
      fillColor = '#dc3545'; // Red
      borderColor = '#a71d2a';
    } else if (status === 'غير مستثمر') {
      fillColor = '#28a745'; // Green
      borderColor = '#1e7e34';
    } else if (status === 'قيد الطرح') {
      fillColor = '#ffc107'; // Yellow
      borderColor = '#d39e00';
    } else {
      fillColor = '#6c757d'; // Gray fallback
      borderColor = '#495057';
    }
    
    return {
      color: borderColor,
      weight: 2,
      dashArray: status === 'قيد الطرح' ? '6,4' : null,
      fillColor,
      fillOpacity: 0.6,
      className: `plot-shape ${type === 'كبري' ? 'large' : 'small'} ${status === 'قيد الطرح' ? 'dash-anim' : ''}`
    };
  }

  function featurePopup(feature, layer) {
    const p = feature.properties;
    const html = `
      <div class="plot-tooltip">
        <div class="ttl">${p.name || "قطعة أرض"}</div>
        <div class="row">رقم القطعة: <strong>${p.plotNumber || '-'}</strong></div>
        <div class="row">رقم المخطط: <strong>${p.planNumber || '-'}</strong></div>
        <div class="row">الحي: <strong>${p.district}</strong></div>
        <div class="row">الحالة: <strong>${p.investmentStatus || '-'}</strong></div>
        <div class="row">المساحة: <strong>${formatArea(p.area)}</strong></div>
      </div>
    `;
    layer.bindTooltip(html, { direction: 'top', sticky: true, opacity: 1, className: 'plot-tooltip' });
    layer.on('mouseover', function(){ this.bringToFront(); });

    // Hover and click interactions to update info card
    layer.on('mouseover', () => {
      infoTitle.textContent = p.name || 'قطعة أرض';
      infoPlotNumber.textContent = p.plotNumber || '-';
      infoPlanNumber.textContent = p.planNumber || '-';
      infoDistrict.textContent = p.district;
      infoArea.textContent = formatArea(p.area);
      const status = p.investmentStatus || '-';
      document.getElementById('infoStatus').textContent = status;
    });
    layer.on('click', () => {
      infoTitle.textContent = p.name || 'قطعة أرض';
      infoPlotNumber.textContent = p.plotNumber || '-';
      infoPlanNumber.textContent = p.planNumber || '-';
      infoDistrict.textContent = p.district;
      infoArea.textContent = formatArea(p.area);
      document.getElementById('infoStatus').textContent = p.investmentStatus || '-';
      // render images
      if (infoImages) {
        infoImages.innerHTML = '';
        (p.images || []).slice(0,6).forEach(src => {
          const img = document.createElement('img');
          img.src = src;
          img.alt = p.name || 'صورة قطعة أرض';
          img.style.cursor = 'zoom-in';
          img.addEventListener('click', () => {
            // open viewer and shrink map
            if (viewerImg && imageViewer) {
              viewerImg.src = src;
              imageViewer.style.display = 'flex';
              document.getElementById('map').classList.add('map-mini');
            }
          });
          infoImages.appendChild(img);
        });
      }
      // zoom to feature with smooth animation
      try {
        const b = layer.getBounds();
        if (b && b.isValid()) {
          const padding = window.innerWidth < 900 ? [20, 20] : [120, 120];
          
          // Use flyToBounds for smoother animation
          map.flyToBounds(b, {
            paddingTopLeft: padding,
            paddingBottomRight: padding,
            maxZoom: 16,
            duration: 1.2
          });
          
          console.log('Zooming to plot:', p.name);
        }
      } catch(e) {
        console.error('Error zooming to plot:', e);
      }
    });
  }

  // Close viewer by clicking map or overlay
  if (imageViewer) {
    imageViewer.addEventListener('click', () => {
      imageViewer.style.display = 'none';
      document.getElementById('map').classList.remove('map-mini');
    });
  }
  document.getElementById('map').addEventListener('click', () => {
    if (imageViewer && imageViewer.style.display === 'flex') {
      imageViewer.style.display = 'none';
      document.getElementById('map').classList.remove('map-mini');
    }
  });

  function applyFiltersToData() {
    const filtered = PLOTS_GEOJSON.features.filter(f => {
      const p = f.properties;
      if (currentFilters.district !== "all" && p.district !== currentFilters.district) return false;
      if (currentFilters.investmentStatus !== "all" && p.investmentStatus !== currentFilters.investmentStatus) return false;
      if (currentFilters.projectType !== "all" && p.projectType !== currentFilters.projectType) return false;
      const area = p.area || 0;
      if (currentFilters.minArea != null && area < currentFilters.minArea) return false;
      if (currentFilters.maxArea != null && area > currentFilters.maxArea) return false;
      return true;
    });
    return { type: "FeatureCollection", features: filtered };
  }

  function renderPlots() {
    if (plotsLayer) {
      plotsLayer.remove();
    }
    const filteredGeo = applyFiltersToData();
    // Debug: ensure we have features
    // console.log('Rendering plots:', filteredGeo.features.length);
    plotsLayer = L.geoJSON(filteredGeo, {
      style: getFeatureStyle,
      onEachFeature: featurePopup
    }).addTo(map);

    // add class to paths for glow
    setTimeout(() => {
      const paths = document.querySelectorAll('.leaflet-pane.leaflet-overlay-pane path.leaflet-interactive');
      paths.forEach(p => p.classList.add('plot-shape'));
    }, 0);

    // Fit bounds if features exist
    try {
      const bounds = plotsLayer.getBounds();
      if (bounds.isValid()) {
        // Use flyToBounds for smoother animation
        map.flyToBounds(bounds, {
          padding: [50, 50],
          maxZoom: 14,
          duration: 1.5
        });
        console.log('Zooming to filtered plots');
      }
    } catch (e) {
      console.error('Error fitting bounds:', e);
    }

    // Update stats
    const { count, totalArea, investmentCount } = computeStats(filteredGeo.features);
    statCount.textContent = new Intl.NumberFormat("ar-SA").format(count);
    statArea.textContent = formatArea(totalArea);
    statInvestment.textContent = new Intl.NumberFormat("ar-SA").format(investmentCount);
  }

  function applyFiltersFromUI() {
    const minArea = areaMinRange ? Number(areaMinRange.value) : null;
    const maxArea = areaMaxRange ? Number(areaMaxRange.value) : null;
    currentFilters = {
      district: districtSelect.value,
      investmentStatus: statusSelect.value,
      projectType: typeSelect.value,
      minArea: Number.isFinite(minArea) ? minArea : null,
      maxArea: Number.isFinite(maxArea) ? maxArea : null
    };
    renderPlots();
  }

  function resetFilters() {
    districtSelect.value = "all";
    statusSelect.value = "all";
    typeSelect.value = "all";
    // range sliders already at defaults
    applyFiltersFromUI();
  }

  applyBtn.addEventListener("click", applyFiltersFromUI);
  resetBtn.addEventListener("click", resetFilters);

  // Segmented controls behavior
  statusSegContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.seg');
    if (!btn) return;
    statusSegContainer.querySelectorAll('.seg').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const val = btn.getAttribute('data-status');
    if (val) statusSelect.value = val;
  });

  typeSegContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.seg');
    if (!btn) return;
    typeSegContainer.querySelectorAll('.seg').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const val = btn.getAttribute('data-type');
    if (val) typeSelect.value = val;
  });

  // Range UI syncing
  function updateRangeLabels() {
    if (areaMinVal) areaMinVal.textContent = new Intl.NumberFormat('ar-SA').format(Number(areaMinRange.value));
    if (areaMaxVal) areaMaxVal.textContent = new Intl.NumberFormat('ar-SA').format(Number(areaMaxRange.value));
  }
  if (areaMinRange && areaMaxRange) {
    areaMinRange.addEventListener('input', () => { if (Number(areaMinRange.value) > Number(areaMaxRange.value)) areaMaxRange.value = areaMinRange.value; updateRangeLabels(); });
    areaMaxRange.addEventListener('input', () => { if (Number(areaMaxRange.value) < Number(areaMinRange.value)) areaMinRange.value = areaMaxRange.value; updateRangeLabels(); });
    updateRangeLabels();
  }

  // Charts functionality
  let investmentChart = null;
  let projectTypeChart = null;
  const districtChartsPanel = document.getElementById('districtCharts');

  function updateDistrictCharts(districtName) {
    if (districtName === 'all') {
      // Hide charts when "all" is selected
      districtChartsPanel.style.display = 'none';
      return;
    }

    // Show charts panel
    districtChartsPanel.style.display = 'block';

    // Filter data for selected district
    const districtPlots = PLOTS_GEOJSON.features.filter(f => f.properties.district === districtName);

    // Calculate investment status data
    const investmentData = {
      'مستثمر': 0,
      'غير مستثمر': 0,
      'قيد الطرح': 0
    };
    districtPlots.forEach(f => {
      const status = f.properties.investmentStatus;
      if (investmentData[status] !== undefined) {
        investmentData[status]++;
      }
    });

    // Calculate project type data
    const projectTypeData = {};
    districtPlots.forEach(f => {
      const type = f.properties.projectType;
      projectTypeData[type] = (projectTypeData[type] || 0) + 1;
    });

    // Destroy existing charts
    if (investmentChart) {
      investmentChart.destroy();
    }
    if (projectTypeChart) {
      projectTypeChart.destroy();
    }

    // Create investment status chart
    const investmentCtx = document.getElementById('investmentChart');
    if (investmentCtx) {
      investmentChart = new Chart(investmentCtx, {
        type: 'doughnut',
        data: {
          labels: ['مستثمر', 'غير مستثمر', 'قيد الطرح'],
          datasets: [{
            data: [investmentData['مستثمر'], investmentData['غير مستثمر'], investmentData['قيد الطرح']],
            backgroundColor: [
              'rgba(220, 53, 69, 0.8)',
              'rgba(40, 167, 69, 0.8)',
              'rgba(255, 193, 7, 0.8)'
            ],
            borderColor: [
              '#dc3545',
              '#28a745',
              '#ffc107'
            ],
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                color: '#e8f1ed',
                font: {
                  family: 'Tajawal',
                  size: 12
                },
                padding: 10
              }
            },
            tooltip: {
              backgroundColor: 'rgba(12, 20, 18, 0.95)',
              titleColor: '#e8f1ed',
              bodyColor: '#e8f1ed',
              borderColor: 'rgba(255, 255, 255, 0.12)',
              borderWidth: 1,
              padding: 12,
              titleFont: {
                family: 'Tajawal',
                size: 14
              },
              bodyFont: {
                family: 'Tajawal',
                size: 13
              }
            }
          }
        }
      });
    }

    // Create project type chart
    const projectTypeCtx = document.getElementById('projectTypeChart');
    if (projectTypeCtx) {
      const projectTypeLabels = Object.keys(projectTypeData);
      const projectTypeValues = Object.values(projectTypeData);
      
      projectTypeChart = new Chart(projectTypeCtx, {
        type: 'bar',
        data: {
          labels: projectTypeLabels,
          datasets: [{
            label: 'عدد القطع',
            data: projectTypeValues,
            backgroundColor: 'rgba(0, 168, 107, 0.7)',
            borderColor: '#00a86b',
            borderWidth: 2,
            borderRadius: 8
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                color: '#a7b8b1',
                font: {
                  family: 'Tajawal',
                  size: 11
                },
                stepSize: 1
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.06)'
              }
            },
            x: {
              ticks: {
                color: '#a7b8b1',
                font: {
                  family: 'Tajawal',
                  size: 11
                }
              },
              grid: {
                display: false
              }
            }
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              backgroundColor: 'rgba(12, 20, 18, 0.95)',
              titleColor: '#e8f1ed',
              bodyColor: '#e8f1ed',
              borderColor: 'rgba(255, 255, 255, 0.12)',
              borderWidth: 1,
              padding: 12,
              titleFont: {
                family: 'Tajawal',
                size: 14
              },
              bodyFont: {
                family: 'Tajawal',
                size: 13
              }
            }
          }
        }
      });
    }
  }

  // Listen to district selection changes
  districtSelect.addEventListener('change', (e) => {
    updateDistrictCharts(e.target.value);
  });

  // Hide charts when clicking on a plot
  map.on('click', (e) => {
    // Check if click is on a feature
    const clickedOnFeature = e.originalEvent.target.classList.contains('leaflet-interactive');
    if (clickedOnFeature && districtSelect.value !== 'all') {
      // Hide charts when clicking on a specific plot
      districtChartsPanel.style.display = 'none';
    }
  });

  // Update quick stats bar
  function updateQuickStats() {
    const filteredGeo = applyFiltersToData();
    const { count, totalArea, investmentCount } = computeStats(filteredGeo.features);
    const availableCount = filteredGeo.features.filter(f => f.properties.investmentStatus === 'غير مستثمر').length;
    
    document.getElementById('quickStatTotal').textContent = new Intl.NumberFormat("ar-SA").format(count);
    document.getElementById('quickStatInvested').textContent = new Intl.NumberFormat("ar-SA").format(investmentCount);
    document.getElementById('quickStatArea').textContent = new Intl.NumberFormat("ar-SA", { notation: 'compact' }).format(Math.round(totalArea));
    document.getElementById('quickStatAvailable').textContent = new Intl.NumberFormat("ar-SA").format(availableCount);
  }
  
  // Call updateQuickStats after renderPlots
  const originalRenderPlots = renderPlots;
  renderPlots = function() {
    originalRenderPlots();
    updateQuickStats();
  };
  
  // Recenter button
  const recenterBtn = document.getElementById('recenterBtn');
  if (recenterBtn) {
    recenterBtn.addEventListener('click', () => {
      map.flyTo(ARAR_CENTER, 13, {
        duration: 1.5,
        easeLinearity: 0.25
      });
    });
  }
  
  // Fullscreen button
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', () => {
      const mapElement = document.getElementById('map');
      if (!document.fullscreenElement) {
        mapElement.requestFullscreen().then(() => {
          setTimeout(() => map.invalidateSize(), 100);
        });
      } else {
        document.exitFullscreen().then(() => {
          setTimeout(() => map.invalidateSize(), 100);
        });
      }
    });
  }
  
  // Search functionality
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  
  function searchPlots(query) {
    if (!query) return;
    
    const lowerQuery = query.toLowerCase();
    const found = PLOTS_GEOJSON.features.find(f => {
      const p = f.properties;
      return (
        (p.name && p.name.toLowerCase().includes(lowerQuery)) ||
        (p.plotNumber && p.plotNumber.toLowerCase().includes(lowerQuery)) ||
        (p.district && p.district.toLowerCase().includes(lowerQuery))
      );
    });
    
    if (found && plotsLayer) {
      plotsLayer.eachLayer(layer => {
        if (layer.feature === found) {
          const bounds = layer.getBounds();
          map.flyToBounds(bounds, {
            paddingTopLeft: [120, 120],
            paddingBottomRight: [120, 120],
            maxZoom: 16,
            duration: 1.5
          });
          layer.fire('click');
        }
      });
    } else {
      alert('لم يتم العثور على نتائج');
    }
  }
  
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      searchPlots(searchInput.value);
    });
  }
  
  if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        searchPlots(searchInput.value);
      }
    });
  }
  
  // Share button
  const shareBtn = document.getElementById('shareBtn');
  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      const plotName = document.getElementById('infoTitle').textContent;
      const plotNumber = document.getElementById('infoPlotNumber').textContent;
      const district = document.getElementById('infoDistrict').textContent;
      
      const shareText = `قطعة أرض: ${plotName}\nرقم القطعة: ${plotNumber}\nالحي: ${district}\n\nخريطة الاستثمارات - أمانة منطقة الحدود الشمالية`;
      
      if (navigator.share) {
        navigator.share({
          title: plotName,
          text: shareText,
          url: window.location.href
        }).catch(() => {});
      } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(shareText).then(() => {
          alert('تم نسخ المعلومات إلى الحافظة');
        });
      }
    });
  }

  // Initial render
  renderPlots();
})();