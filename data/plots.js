/* Mock GeoJSON plots around Arar (approximate squares for demo purposes) */
const PLOTS_GEOJSON = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "name": "قطعة A-1",
        "plotNumber": "A-1",
        "planNumber": "خ-102",
        "district": "المساعدية",
        "investmentStatus": "مستثمر",
        "projectType": "كبري",
        "area": 42000,
        "images": ["https://picsum.photos/seed/a1/200/120","https://picsum.photos/seed/a12/200/120"]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [
            41.0120809,
            30.9746839
          ],
          [
            41.0104126,
            30.975521
          ],
          [
            41.0092807,
            30.9737226
          ],
          [
            41.0102946,
            30.9732305
          ],
          [
            41.0120809,
            30.9746839
          ]
        ]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "مبنى F-9",
        "plotNumber": "F-9",
        "planNumber": "خ-221",
        "district": "المساعدية",
        "investmentStatus": "قيد الطرح",
        "projectType": "ناشئة",
        "area": 9800,
        "images": ["https://picsum.photos/seed/f9/200/120"]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [
            41.0107934,
            30.9761051
          ],
          [
            41.0105896,
            30.9761741
          ],
          [
            41.0093933,
            30.9764271
          ],
          [
            41.0090607,
            30.9758522
          ],
          [
            41.0102785,
            30.975314
          ],
          [
            41.0107934,
            30.9761051
          ]
        ]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "مجمع G-5",
        "plotNumber": "G-5",
        "planNumber": "خ-330",
        "district": "الفيصلية",
        "investmentStatus": "مستثمر",
        "projectType": "كبري",
        "area": 52000,
        "images": ["https://picsum.photos/seed/g5/200/120","https://picsum.photos/seed/g52/200/120","https://picsum.photos/seed/g53/200/120"]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [
            41.0362637,
            30.9821094
          ],
          [
            41.0356924,
            30.9811896
          ],
          [
            41.0361671,
            30.9809366
          ],
          [
            41.036776,
            30.9818495
          ],
          [
            41.0362637,
            30.9821094
          ]
        ]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "مبنى H-11",
        "plotNumber": "H-11",
        "planNumber": "خ-419",
        "district": "الفيصلية",
        "investmentStatus": "غير مستثمر",
        "projectType": "متوسطة",
        "area": 7600,
        "images": []
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [
            41.0342641,
            30.9792234
          ],
          [
            41.0337183,
            30.9794902
          ],
          [
            41.0331711,
            30.9786071
          ],
          [
            41.0336895,
            30.9783197
          ],
          [
            41.0342641,
            30.9792234
          ]
        ]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "مركز I-2",
        "plotNumber": "I-2",
        "planNumber": "خ-504",
        "district": "الناصرية",
        "investmentStatus": "مستثمر",
        "projectType": "مشاريع الخصخصة",
        "area": 74000,
        "images": ["https://picsum.photos/seed/i2/200/120"]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [
            41.0415155,
            30.9624487
          ],
          [
            41.0408771,
            30.9627638
          ],
          [
            41.0404828,
            30.962152
          ],
          [
            41.0411534,
            30.961823
          ],
          [
            41.0415155,
            30.9624487
          ]
        ]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "قطعة J-6",
        "plotNumber": "J-6",
        "planNumber": "خ-612",
        "district": "الناصرية",
        "investmentStatus": "غير مستثمر",
        "projectType": "كبري",
        "area": 29000,
        "images": []
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [
            41.0395011,
            30.9626626
          ],
          [
            41.0389405,
            30.9617977
          ],
          [
            41.0394153,
            30.9615815
          ],
          [
            41.0400027,
            30.9623912
          ],
          [
            41.0395011,
            30.9626626
          ]
        ]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "قطعة B-2",
        "plotNumber": "B-2",
        "planNumber": "خ-720",
        "district": "بدنه",
        "investmentStatus": "غير مستثمر",
        "projectType": "ناشئة",
        "area": 8500,
        "images": ["https://picsum.photos/seed/b2/200/120"]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [
            40.9992573,
            30.9841697
          ],
          [
            40.9991446,
            30.9842088
          ],
          [
            40.998989,
            30.9838501
          ],
          [
            40.9986699,
            30.9839375
          ],
          [
            40.998348,
            30.9831005
          ],
          [
            40.9987879,
            30.982974
          ],
          [
            40.9992573,
            30.9841697
          ]
        ]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "قطعة C-7",
        "plotNumber": "C-7",
        "planNumber": "خ-831",
        "district": "بدنه",
        "investmentStatus": "مستثمر",
        "projectType": "متوسطة",
        "area": 12000,
        "images": []
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [
            40.9992519,
            30.9812861
          ],
          [
            40.998238,
            30.9815943
          ],
          [
            40.9978357,
            30.9806906
          ],
          [
            40.9982809,
            30.9805733
          ],
          [
            40.9983426,
            30.980732
          ],
          [
            40.9987772,
            30.9806078
          ],
          [
            40.99893,
            30.9809458
          ],
          [
            40.9991017,
            30.9809113
          ],
          [
            40.9992519,
            30.9812861
          ]
        ]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "قطعة D-4",
        "plotNumber": "D-4",
        "planNumber": "خ-940",
        "district": "الجوهرة",
        "investmentStatus": "مستثمر",
        "projectType": "كبري",
        "area": 65000,
        "images": ["https://picsum.photos/seed/d4/200/120"]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [
            41.0082856,
            30.950711
          ],
          [
            41.0071081,
            30.9511734
          ],
          [
            41.0060567,
            30.9492066
          ],
          [
            41.0072261,
            30.9487442
          ],
          [
            41.0082856,
            30.950711
          ]
        ]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "قطعة E-3",
        "plotNumber": "E-3",
        "planNumber": "خ-1010",
        "district": "الجوهرة",
        "investmentStatus": "غير مستثمر",
        "projectType": "متوسطة",
        "area": 33000,
        "images": []
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [
            41.0094604,
            30.9485694
          ],
          [
            41.0091573,
            30.9479713
          ],
          [
            41.0106003,
            30.9473824
          ],
          [
            41.0110965,
            30.9479115
          ],
          [
            41.0094604,
            30.9485694
          ]
        ]]
      }
    },

    {
      "type": "Feature",
      "properties": {
        "name": "قطعة A-200",
        "plotNumber": "A-200",
        "planNumber": "خ-102",
        "district": "المروج",
        "investmentStatus": "مستثمر",
        "projectType": "كبري",
        "area": 41000,
        "images": ["https://picsum.photos/seed/a1/200/120","https://picsum.photos/seed/a12/200/120"]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [
            41.0755742,
            31.0114814
          ],
          [
            41.0757244,
            31.0103596
          ],
          [
            41.0781491,
            31.0088331
          ],
          [
            41.0795224,
            31.0090078
          ],
          [
            41.0793185,
            31.0099366
          ],
          [
            41.0768509,
            31.0115458
          ],
          [
            41.0755742,
            31.0114814
          ]
        ]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "مبنى F-977",
        "plotNumber": "F-977",
        "planNumber": "خ-221",
        "district": "البروج",
        "investmentStatus": "قيد الطرح",
        "projectType": "ناشئة",
        "area": 9800,
        "images": ["https://picsum.photos/seed/f9/200/120"]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [
            41.0866624,
            31.0114239
          ],
          [
            41.084066,
            31.0111136
          ],
          [
            41.0842484,
            31.0099228
          ],
          [
            41.0851765,
            31.0093412
          ],
          [
            41.0862547,
            31.0094768
          ],
          [
            41.0868636,
            31.0102814
          ],
          [
            41.0866624,
            31.0114239
          ]
        ]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "مجمع G-588",
        "plotNumber": "G-588",
        "planNumber": "خ-330",
        "district": "الربوة",
        "investmentStatus": "مستثمر",
        "projectType": "كبري",
        "area": 52000,
        "images": ["https://picsum.photos/seed/g5/200/120","https://picsum.photos/seed/g52/200/120","https://picsum.photos/seed/g53/200/120"]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [
            41.0540843,
            31.0000418
          ],
          [
            41.0532367,
            31.0004326
          ],
          [
            41.0527271,
            30.9997337
          ],
          [
            41.0524535,
            30.9992693
          ],
          [
            41.0533118,
            30.9988508
          ],
          [
            41.0540843,
            31.0000418
          ]
        ]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "مبنى H-1122",
        "plotNumber": "H-1122",
        "planNumber": "خ-419",
        "district": "الربوة",
        "investmentStatus": "غير مستثمر",
        "projectType": "متوسطة",
        "area": 7600,
        "images": []
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [
            41.0522443,
            30.9989566
          ],
          [
            41.0513699,
            30.999398
          ],
          [
            41.0509193,
            30.9987405
          ],
          [
            41.0508576,
            30.9987451
          ],
          [
            41.0506001,
            30.9983427
          ],
          [
            41.0511258,
            30.9981151
          ],
          [
            41.051209,
            30.9981519
          ],
          [
            41.0515764,
            30.9979932
          ],
          [
            41.0516918,
            30.99803
          ],
          [
            41.0522443,
            30.9989566
          ]
        ]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "مركز I-233",
        "plotNumber": "I-233",
        "planNumber": "خ-504",
        "district": "النسيم",
        "investmentStatus": "مستثمر",
        "projectType": "مشاريع الخصخصة",
        "area": 74000,
        "images": ["https://picsum.photos/seed/i2/200/120"]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [
            41.0593951,
            30.9766248
          ],
          [
            41.057952,
            30.9772733
          ],
          [
            41.0575873,
            30.9767352
          ],
          [
            41.0589391,
            30.9760545
          ],
          [
            41.0593951,
            30.9766248
          ]
        ]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "قطعة J-644",
        "plotNumber": "J-644",
        "planNumber": "خ-612",
        "district": "النسيم",
        "investmentStatus": "غير مستثمر",
        "projectType": "كبري",
        "area": 29000,
        "images": []
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [
            41.0572305,
            30.9737801
          ],
          [
            41.0568443,
            30.9731822
          ],
          [
            41.057539,
            30.9728464
          ],
          [
            41.0576785,
            30.972805
          ],
          [
            41.0578018,
            30.9727337
          ],
          [
            41.0582337,
            30.9724095
          ],
          [
            41.0587326,
            30.9729177
          ],
          [
            41.0581774,
            30.9733179
          ],
          [
            41.0572305,
            30.9737801
          ]
        ]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "قطعة B-266",
        "plotNumber": "B-266",
        "planNumber": "خ-720",
        "district": "نسائم القدس",
        "investmentStatus": "غير مستثمر",
        "projectType": "ناشئة",
        "area": 8500,
        "images": ["https://picsum.photos/seed/b2/200/120"]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [
            41.1022139,
            31.0231219
          ],
          [
            41.1014843,
            31.0231449
          ],
          [
            41.1012965,
            31.0230438
          ],
          [
            41.1011571,
            31.0216876
          ],
          [
            41.1020476,
            31.0216371
          ],
          [
            41.1022139,
            31.0231219
          ]
        ]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "قطعة C-777",
        "plotNumber": "C-777",
        "planNumber": "خ-831",
        "district": "نسائم القدس",
        "investmentStatus": "مستثمر",
        "projectType": "متوسطة",
        "area": 12000,
        "images": []
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [
            41.0937381,
            31.0253285
          ],
          [
            41.0936818,
            31.02457
          ],
          [
            41.0968146,
            31.0243034
          ],
          [
            41.0968843,
            31.0250757
          ],
          [
            41.0968119,
            31.0251102
          ],
          [
            41.0937381,
            31.0253285
          ]
        ]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "قطعة D-499",
        "plotNumber": "D-499",
        "planNumber": "خ-940",
        "district": "الجوهرة",
        "investmentStatus": "مستثمر",
        "projectType": "كبري",
        "area": 65000,
        "images": ["https://picsum.photos/seed/d4/200/120"]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [
            41.0039726,
            30.9425193
          ],
          [
            41.001564,
            30.9424526
          ],
          [
            41.0015801,
            30.9420293
          ],
          [
            41.0039994,
            30.9421144
          ],
          [
            41.0039726,
            30.9425193
          ]
        ]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "قطعة E-355",
        "plotNumber": "E-355",
        "planNumber": "خ-1010",
        "district": "الجوهرة",
        "investmentStatus": "غير مستثمر",
        "projectType": "متوسطة",
        "area": 33000,
        "images": []
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [
            41.0338765,
            30.9661608
          ],
          [
            41.0327017,
            30.9667496
          ],
          [
            41.0323477,
            30.966193
          ],
          [
            41.0335493,
            30.9655996
          ],
          [
            41.0338765,
            30.9661608
          ]
        ]]
      }
    }
  ]
};