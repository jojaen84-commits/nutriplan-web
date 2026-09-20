/* Nutriplan Persona 1&Persona 2 - Base de datos actualizada */
window.NUTRIPLAN_DATA = {
  "profiles": {
    "P01": {
      "id": "P01",
      "name": "Persona 1",
      "kcal": 1950,
      "protein": 150,
      "carbs": 203,
      "fat": 60,
      "notes": "Referencia técnica de ración base 1"
    },
    "P02": {
      "id": "P02",
      "name": "Persona 2",
      "kcal": 1400,
      "protein": 110,
      "carbs": 140,
      "fat": 45,
      "notes": "Referencia técnica de ración base 2"
    }
  },
  "recipes": {
    "R001": {
      "id": "R001",
      "version": "1.0",
      "name": "Pollo con salsa de champiñones y patata",
      "type": "COMIDA",
      "status": "ACTIVA",
      "tags": [
        "POLLO",
        "PATATA",
        "ALTA_PROTEINA",
        "COCINA_COMPARTIDA"
      ],
      "notes": "Salsa para los dos: 200 ml de leche evaporada + 85 g de champiñones escurridos. Mantener la cebolla y el aceite indicados. Cocinar el pollo con la salsa y preparar las patatas aparte. Si se mezcla todo el pollo con la salsa, pesar el conjunto cocinado para repartir las raciones.",
      "image": null,
      "image_status": "PENDIENTE",
      "summary": {
        "P01": {
          "kcal": 650.73,
          "protein": 51.506,
          "carbs": 78.14500000000001,
          "fat": 14.739,
          "p_pct": 0.31634920269326144,
          "c_pct": 0.479965604870596,
          "f_pct": 0.2036851924361425,
          "goal_pct": 0.3337076923076923
        },
        "P02": {
          "kcal": 473.42,
          "protein": 36.709,
          "carbs": 58.035000000000004,
          "fat": 10.531,
          "p_pct": 0.3099407921816129,
          "c_pct": 0.49000010553978324,
          "f_pct": 0.20005910227860393,
          "goal_pct": 0.3381571428571429
        }
      },
      "portions": {
        "P01": [
          {
            "food_id": "A001",
            "food": "Pechuga de pollo",
            "grams": 150.0,
            "note": "",
            "state": "crudo"
          },
          {
            "food_id": "A002",
            "food": "Patata",
            "grams": 400.0,
            "note": "",
            "state": "crudo"
          },
          {
            "food_id": "A003",
            "food": "Champiñones laminados",
            "grams": 49.0,
            "note": "parte proporcional de 85 g totales escurridos",
            "state": "peso escurrido"
          },
          {
            "food_id": "A004",
            "food": "Cebolla",
            "grams": 50.0,
            "note": "",
            "state": "crudo"
          },
          {
            "food_id": "A005",
            "food": "Leche evaporada parcialmente desnatada",
            "grams": 116.0,
            "note": "parte proporcional de 200 ml totales",
            "state": "producto"
          },
          {
            "food_id": "A006",
            "food": "Aceite de oliva virgen extra",
            "grams": 7.0,
            "note": "",
            "state": "producto"
          }
        ],
        "P02": [
          {
            "food_id": "A001",
            "food": "Pechuga de pollo",
            "grams": 105.0,
            "note": "",
            "state": "crudo"
          },
          {
            "food_id": "A002",
            "food": "Patata",
            "grams": 300.0,
            "note": "",
            "state": "crudo"
          },
          {
            "food_id": "A003",
            "food": "Champiñones laminados",
            "grams": 36.0,
            "note": "parte proporcional de 85 g totales escurridos",
            "state": "peso escurrido"
          },
          {
            "food_id": "A004",
            "food": "Cebolla",
            "grams": 35.0,
            "note": "",
            "state": "crudo"
          },
          {
            "food_id": "A005",
            "food": "Leche evaporada parcialmente desnatada",
            "grams": 84.0,
            "note": "parte proporcional de 200 ml totales",
            "state": "producto"
          },
          {
            "food_id": "A006",
            "food": "Aceite de oliva virgen extra",
            "grams": 5.0,
            "note": "",
            "state": "producto"
          }
        ]
      },
      "mix_mode": "joint",
      "code": "REC-001"
    },
    "R002": {
      "id": "R002",
      "code": "REC-002",
      "version": "2.0",
      "name": "Yogur griego ligero con fruta y gotas de chocolate",
      "type": "MERIENDA",
      "status": "ACTIVA",
      "tags": [
        "MERIENDA",
        "YOGUR",
        "FRUTA",
        "CHOCOLATE",
        "SIN_WHEY"
      ],
      "notes": "Fruta base: melocotón. Persona 1: 150 g sin hueso; Persona 2: 120 g. Puede sustituirse por plátano cuando interese subir hidratos: usar 100 g para Persona 1 y 80 g para Persona 2. La sustitución por plátano aumenta aproximadamente 30 kcal y 9 g HC en la ración de Persona 1. No lleva proteína en polvo.",
      "image": null,
      "image_status": "PENDIENTE",
      "summary": {
        "P01": {
          "kcal": 233.55,
          "protein": 16.15,
          "carbs": 28.95,
          "fat": 6.7,
          "p_pct": 0.26838388034898214,
          "c_pct": 0.48109680099709184,
          "f_pct": 0.25051931865392607,
          "goal_pct": 0.11976923076923078
        },
        "P02": {
          "kcal": 186.84,
          "protein": 12.92,
          "carbs": 23.16,
          "fat": 5.36,
          "p_pct": 0.26838388034898214,
          "c_pct": 0.4810968009970918,
          "f_pct": 0.25051931865392607,
          "goal_pct": 0.13345714285714286
        }
      },
      "portions": {
        "P01": [
          {
            "food_id": "A007",
            "food": "Yogur griego ligero natural Hacendado",
            "grams": 250.0,
            "note": "",
            "state": "producto"
          },
          {
            "food_id": "A042",
            "food": "Melocotón",
            "grams": 150.0,
            "note": "peso sin hueso",
            "state": "crudo"
          },
          {
            "food_id": "A010",
            "food": "Gotas de chocolate para fundir Hacendado",
            "grams": 5.0,
            "note": "",
            "state": "producto"
          }
        ],
        "P02": [
          {
            "food_id": "A007",
            "food": "Yogur griego ligero natural Hacendado",
            "grams": 200.0,
            "note": "",
            "state": "producto"
          },
          {
            "food_id": "A042",
            "food": "Melocotón",
            "grams": 120.0,
            "note": "peso sin hueso",
            "state": "crudo"
          },
          {
            "food_id": "A010",
            "food": "Gotas de chocolate para fundir Hacendado",
            "grams": 4.0,
            "note": "",
            "state": "producto"
          }
        ]
      }
    },
    "R004": {
      "id": "R004",
      "version": "1.0",
      "name": "Salmón con arroz y salteado de verduras asadas",
      "type": "COMIDA",
      "status": "ACTIVA",
      "tags": [
        "SALMON",
        "ARROZ",
        "VERDURAS",
        "RAPIDA",
        "OMEGA3",
        "MERCADONA"
      ],
      "notes": "Salmón a la plancha/airfryer, arroz al microondas y verduras salteadas. 0 g de aceite añadido: NO AÑADIR ACEITE.",
      "image": null,
      "image_status": "PENDIENTE",
      "summary": {
        "P01": {
          "kcal": 659.92,
          "protein": 39.009,
          "carbs": 66.75999999999999,
          "fat": 24.751,
          "p_pct": 0.24160350553934054,
          "c_pct": 0.4134802232768431,
          "f_pct": 0.3449162711838163,
          "goal_pct": 0.3384205128205128
        },
        "P02": {
          "kcal": 472.5,
          "protein": 25.29,
          "carbs": 56.4,
          "fat": 15.03,
          "p_pct": 0.21894682163495877,
          "c_pct": 0.4882799818193624,
          "f_pct": 0.29277319654567885,
          "goal_pct": 0.3375
        }
      },
      "portions": {
        "P01": [
          {
            "food_id": "A017",
            "food": "Salmón en lomos",
            "grams": 150.0,
            "note": "",
            "state": "producto"
          },
          {
            "food_id": "A018",
            "food": "Arroz ultracongelado",
            "grams": 167.0,
            "note": "1 porción aprox.",
            "state": "producto"
          },
          {
            "food_id": "A019",
            "food": "Salteado de verduras asadas ultracongeladas",
            "grams": 250.0,
            "note": "",
            "state": "producto"
          }
        ],
        "P02": [
          {
            "food_id": "A017",
            "food": "Salmón en lomos",
            "grams": 90.0,
            "note": "",
            "state": "producto"
          },
          {
            "food_id": "A018",
            "food": "Arroz ultracongelado",
            "grams": 150.0,
            "note": "",
            "state": "producto"
          },
          {
            "food_id": "A019",
            "food": "Salteado de verduras asadas ultracongeladas",
            "grams": 180.0,
            "note": "",
            "state": "producto"
          }
        ]
      },
      "mix_mode": "joint",
      "code": "REC-004"
    },
    "R005": {
      "id": "R005",
      "version": "1.0",
      "name": "Pollo con pisto y patatas",
      "type": "COMIDA",
      "status": "ACTIVA",
      "tags": [
        "POLLO",
        "PISTO",
        "PATATA",
        "RAPIDA",
        "MERCADONA",
        "COCINA_COMPARTIDA"
      ],
      "notes": "Usar 1 brick completo de pisto entre los dos. Patatas al microondas con aceite en spray medido: 3 g para él y 2 g para ella.",
      "image": null,
      "image_status": "PENDIENTE",
      "summary": {
        "P01": {
          "kcal": 681.6,
          "protein": 48.26,
          "carbs": 82.88,
          "fat": 16.740000000000002,
          "p_pct": 0.28589200556855543,
          "c_pct": 0.49098071739581167,
          "f_pct": 0.22312727703563287,
          "goal_pct": 0.3495384615384616
        },
        "P02": {
          "kcal": 485.8,
          "protein": 32.28,
          "carbs": 61.64,
          "fat": 11.719999999999999,
          "p_pct": 0.2683514839138748,
          "c_pct": 0.5124282982791587,
          "f_pct": 0.2192202178069665,
          "goal_pct": 0.34700000000000003
        }
      },
      "portions": {
        "P01": [
          {
            "food_id": "A001",
            "food": "Pechuga de pollo",
            "grams": 170.0,
            "note": "",
            "state": "crudo"
          },
          {
            "food_id": "A002",
            "food": "Patata",
            "grams": 400.0,
            "note": "",
            "state": "crudo"
          },
          {
            "food_id": "A020",
            "food": "Fritada pisto Hacendado",
            "grams": 220.0,
            "note": "",
            "state": "producto"
          },
          {
            "food_id": "A006",
            "food": "Aceite de oliva virgen extra",
            "grams": 3.0,
            "note": "spray para patatas",
            "state": "producto"
          }
        ],
        "P02": [
          {
            "food_id": "A001",
            "food": "Pechuga de pollo",
            "grams": 110.0,
            "note": "",
            "state": "crudo"
          },
          {
            "food_id": "A002",
            "food": "Patata",
            "grams": 300.0,
            "note": "",
            "state": "crudo"
          },
          {
            "food_id": "A020",
            "food": "Fritada pisto Hacendado",
            "grams": 160.0,
            "note": "",
            "state": "producto"
          },
          {
            "food_id": "A006",
            "food": "Aceite de oliva virgen extra",
            "grams": 2.0,
            "note": "spray para patatas",
            "state": "producto"
          }
        ]
      },
      "mix_mode": "joint",
      "code": "REC-005"
    },
    "R007": {
      "id": "R007",
      "version": "1.5",
      "name": "Wrap tipo campero de pavo, huevo y Havarti",
      "type": "CENA",
      "status": "ACTIVA",
      "tags": [
        "WRAP",
        "PAVO",
        "HUEVO",
        "HAVARTI",
        "GRILL",
        "ALTA_PROTEINA",
        "RAPIDA",
        "MERCADONA"
      ],
      "notes": "Wrap tipo campero. Persona 1: 1 tortilla de avena de 60 g. Persona 2: 1 tortilla de 60 g. Huevo en tortilla francesa fina. Persona 1: 4 lonchas de pavo + 1 loncha Havarti. Persona 2: 3 lonchas de pavo + 1 loncha Havarti. Salsa de yogur con especias, sin mostaza. Sin cebolla caramelizada. 1 g de AOVE spray para la tortilla. La tortilla de avena queda fijada en 60 g (1 unidad) y no se escala parcialmente. El cálculo nutricional de esta receta se realiza a partir de los gramos finales de cada ingrediente para respetar correctamente los alimentos fijados.",
      "image": null,
      "image_status": "PENDIENTE",
      "summary": {
        "P01": {
          "kcal": 441.5,
          "protein": 44.775000000000006,
          "carbs": 26.18,
          "fat": 16.650000000000002,
          "p_pct": 0.41298683330643116,
          "c_pct": 0.2414739317914543,
          "f_pct": 0.3455392349021145,
          "goal_pct": 0.24097435897435895
        },
        "P02": {
          "kcal": 419.25,
          "protein": 39.900000000000006,
          "carbs": 26.179999999999996,
          "fat": 16.325,
          "p_pct": 0.3880898248003016,
          "c_pct": 0.25464139381633816,
          "f_pct": 0.3572687813833602,
          "goal_pct": 0.31975
        }
      },
      "portions": {
        "P01": [
          {
            "food_id": "A021",
            "food": "Tortillas de avena 51% Hacendado",
            "grams": 60.0,
            "note": "1 tortilla de 60 g",
            "state": "producto"
          },
          {
            "food_id": "A012",
            "food": "Pechuga de pavo en lonchas",
            "grams": 100.0,
            "note": "4 lonchas aprox.",
            "state": "producto"
          },
          {
            "food_id": "A016",
            "food": "Huevo entero",
            "grams": 60.0,
            "note": "1 huevo; tortilla francesa fina",
            "state": "crudo"
          },
          {
            "food_id": "A013",
            "food": "Queso Havarti light",
            "grams": 25.0,
            "note": "1 loncha",
            "state": "producto"
          },
          {
            "food_id": "A007",
            "food": "Yogur griego natural",
            "grams": 30.0,
            "note": "salsa de yogur con especias",
            "state": "producto"
          },
          {
            "food_id": "A006",
            "food": "Aceite de oliva virgen extra",
            "grams": 1.0,
            "note": "spray para tortilla de huevo",
            "state": "producto"
          }
        ],
        "P02": [
          {
            "food_id": "A021",
            "food": "Tortillas de avena 51% Hacendado",
            "grams": 60.0,
            "note": "1 tortilla de 60 g",
            "state": "producto"
          },
          {
            "food_id": "A012",
            "food": "Pechuga de pavo en lonchas",
            "grams": 75.0,
            "note": "3 lonchas aprox.",
            "state": "producto"
          },
          {
            "food_id": "A016",
            "food": "Huevo entero",
            "grams": 60.0,
            "note": "1 huevo; tortilla francesa fina",
            "state": "crudo"
          },
          {
            "food_id": "A013",
            "food": "Queso Havarti light",
            "grams": 25.0,
            "note": "1 loncha",
            "state": "producto"
          },
          {
            "food_id": "A007",
            "food": "Yogur griego natural",
            "grams": 30.0,
            "note": "salsa de yogur con especias",
            "state": "producto"
          },
          {
            "food_id": "A006",
            "food": "Aceite de oliva virgen extra",
            "grams": 1.0,
            "note": "spray para tortilla de huevo",
            "state": "producto"
          }
        ]
      },
      "code": "REC-007",
      "locked_food_ids": [
        "A021"
      ],
      "calculation_mode": "INGREDIENT_SUM"
    },
    "R008": {
      "id": "R008",
      "version": "1.0",
      "name": "Batido proteico helado · día normal",
      "type": "MERIENDA",
      "status": "ACTIVA",
      "tags": [
        "BATIDO",
        "ALTA_PROTEINA",
        "RAPIDA",
        "DIA_NORMAL"
      ],
      "notes": "Batir todos los ingredientes hasta obtener textura de helado/batido espeso. Versión reducida proporcionalmente respecto a la original, incluido el hielo.",
      "image": null,
      "image_status": "PENDIENTE",
      "summary": {
        "P01": {
          "kcal": 265.0,
          "protein": 26.886297376093292,
          "carbs": 32.91253644314869,
          "fat": 2.317784256559767,
          "p_pct": 0.41354723707664875,
          "c_pct": 0.5062388591800356,
          "f_pct": 0.08021390374331551,
          "goal_pct": 0.1358974358974359
        },
        "P02": {
          "kcal": 190.25641025641025,
          "protein": 19.30298273155416,
          "carbs": 23.629513343799058,
          "fat": 1.664050235478807,
          "p_pct": 0.41354723707664875,
          "c_pct": 0.5062388591800356,
          "f_pct": 0.08021390374331551,
          "goal_pct": 0.1358974358974359
        }
      },
      "portions": {
        "P01": [
          {
            "food_id": "A008",
            "food": "Plátano",
            "grams": 58.0,
            "note": "",
            "state": "parte comestible"
          },
          {
            "food_id": "A022",
            "food": "Harina de avena Hacendado",
            "grams": 23.0,
            "note": "",
            "state": "producto"
          },
          {
            "food_id": "A023",
            "food": "Evolate 2.0 Chocolate",
            "grams": 23.0,
            "note": "",
            "state": "polvo"
          },
          {
            "food_id": "A024",
            "food": "Leche desnatada Covap",
            "grams": 97.0,
            "note": "≈97 ml",
            "state": "producto"
          },
          {
            "food_id": "A025",
            "food": "Hielo",
            "grams": 97.0,
            "note": "reducido proporcionalmente",
            "state": "producto"
          }
        ],
        "P02": [
          {
            "food_id": "A008",
            "food": "Plátano",
            "grams": 42,
            "note": "",
            "state": "parte comestible"
          },
          {
            "food_id": "A022",
            "food": "Harina de avena Hacendado",
            "grams": 17,
            "note": "",
            "state": "producto"
          },
          {
            "food_id": "A023",
            "food": "Evolate 2.0 Chocolate",
            "grams": 17,
            "note": "",
            "state": "polvo"
          },
          {
            "food_id": "A024",
            "food": "Leche desnatada Covap",
            "grams": 70,
            "note": "≈70 ml",
            "state": "producto"
          },
          {
            "food_id": "A025",
            "food": "Hielo",
            "grams": 70,
            "note": "reducido proporcionalmente",
            "state": "producto"
          }
        ]
      },
      "code": "REC-008"
    },
    "R009": {
      "id": "R009",
      "version": "1.0",
      "name": "Batido proteico helado · postentreno",
      "type": "MERIENDA",
      "status": "ACTIVA",
      "tags": [
        "BATIDO",
        "ALTA_PROTEINA",
        "POSTENTRENO",
        "RECUPERACION"
      ],
      "notes": "Receta original de Indya. Batir todos los ingredientes hasta obtener textura de helado/batido espeso.",
      "image": null,
      "image_status": "PENDIENTE",
      "summary": {
        "P01": {
          "kcal": 343.0,
          "protein": 34.8,
          "carbs": 42.6,
          "fat": 3.0,
          "p_pct": 0.41354723707664875,
          "c_pct": 0.5062388591800356,
          "f_pct": 0.08021390374331551,
          "goal_pct": 0.1758974358974359
        },
        "P02": {
          "kcal": 246.25641025641025,
          "protein": 24.98461538461538,
          "carbs": 30.584615384615386,
          "fat": 2.1538461538461537,
          "p_pct": 0.41354723707664875,
          "c_pct": 0.5062388591800356,
          "f_pct": 0.08021390374331551,
          "goal_pct": 0.1758974358974359
        }
      },
      "portions": {
        "P01": [
          {
            "food_id": "A008",
            "food": "Plátano",
            "grams": 75.0,
            "note": "",
            "state": "parte comestible"
          },
          {
            "food_id": "A022",
            "food": "Harina de avena Hacendado",
            "grams": 30.0,
            "note": "",
            "state": "producto"
          },
          {
            "food_id": "A023",
            "food": "Evolate 2.0 Chocolate",
            "grams": 30.0,
            "note": "1 scoop",
            "state": "polvo"
          },
          {
            "food_id": "A024",
            "food": "Leche desnatada Covap",
            "grams": 125.0,
            "note": "125 ml",
            "state": "producto"
          },
          {
            "food_id": "A025",
            "food": "Hielo",
            "grams": 125.0,
            "note": "",
            "state": "producto"
          }
        ],
        "P02": [
          {
            "food_id": "A008",
            "food": "Plátano",
            "grams": 54,
            "note": "",
            "state": "parte comestible"
          },
          {
            "food_id": "A022",
            "food": "Harina de avena Hacendado",
            "grams": 22,
            "note": "",
            "state": "producto"
          },
          {
            "food_id": "A023",
            "food": "Evolate 2.0 Chocolate",
            "grams": 22,
            "note": "1 scoop",
            "state": "polvo"
          },
          {
            "food_id": "A024",
            "food": "Leche desnatada Covap",
            "grams": 90,
            "note": "≈90 ml",
            "state": "producto"
          },
          {
            "food_id": "A025",
            "food": "Hielo",
            "grams": 90,
            "note": "",
            "state": "producto"
          }
        ]
      },
      "code": "REC-009"
    },
    "R010": {
      "id": "R010",
      "version": "1.0",
      "name": "Batido de proteína con cacao",
      "type": "SUPLEMENTACION",
      "status": "ACTIVA",
      "tags": [
        "BATIDO",
        "ALTA_PROTEINA",
        "RAPIDA",
        "SIN_COCCION",
        "SUPLEMENTACION"
      ],
      "notes": "Mezclar o batir la leche con la whey y el cacao desgrasado en polvo. El cacao está calculado con la etiqueta real del producto Mercadona (375 kcal/100 g).",
      "image": null,
      "image_status": "PENDIENTE",
      "summary": {
        "P01": {
          "kcal": 220.25,
          "protein": 32.775,
          "carbs": 15.315,
          "fat": 2.8,
          "p_pct": 0.602592388306674,
          "c_pct": 0.2815774958632102,
          "f_pct": 0.11583011583011583,
          "goal_pct": 0.11294871794871796
        },
        "P02": {
          "kcal": 161.6,
          "protein": 24.006666666666668,
          "carbs": 11.118666666666666,
          "fat": 2.1,
          "p_pct": 0.6024207242097516,
          "c_pct": 0.27901063144599375,
          "f_pct": 0.11856864434425478,
          "goal_pct": 0.11542857142857142
        }
      },
      "portions": {
        "P01": [
          {
            "food_id": "A024",
            "food": "Leche desnatada Covap",
            "grams": 250.0,
            "note": "≈250 ml",
            "state": "producto"
          },
          {
            "food_id": "A009",
            "food": "Impact Whey Protein sin sabor",
            "grams": 30.0,
            "note": "1 scoop aprox.",
            "state": "polvo"
          },
          {
            "food_id": "A026",
            "food": "Cacao desgrasado en polvo",
            "grams": 5.0,
            "note": "",
            "state": "producto"
          }
        ],
        "P02": [
          {
            "food_id": "A024",
            "food": "Leche desnatada Covap",
            "grams": 180.0,
            "note": "≈180 ml",
            "state": "producto"
          },
          {
            "food_id": "A009",
            "food": "Impact Whey Protein sin sabor",
            "grams": 22.0,
            "note": "",
            "state": "polvo"
          },
          {
            "food_id": "A026",
            "food": "Cacao desgrasado en polvo",
            "grams": 4.0,
            "note": "",
            "state": "producto"
          }
        ]
      },
      "code": "REC-010"
    },
    "R011": {
      "id": "R011",
      "version": "2.0",
      "name": "Tostada de tomate, pavo y aceite",
      "type": "DESAYUNO",
      "status": "ACTIVA",
      "tags": [
        "TOSTADA",
        "PAVO",
        "CAFE",
        "RAPIDA",
        "MERCADONA"
      ],
      "notes": "Pan baguette con tomate natural rallado, pechuga de pavo y AOVE medido. El café con leche se registra ahora por separado en la sección Cafés del menú diario.",
      "image": "images/REC-011.webp",
      "image_status": "GENERADA",
      "summary": {
        "P01": {
          "kcal": 317.2,
          "protein": 21.95,
          "carbs": 43.55,
          "fat": 6.9,
          "p_pct": 0.2709040419623573,
          "c_pct": 0.5374884294970688,
          "f_pct": 0.1916075285405739,
          "goal_pct": 0.18974358974358974
        },
        "P02": {
          "kcal": 233.23,
          "protein": 16.1415,
          "carbs": 32.021499999999996,
          "fat": 5.072,
          "p_pct": 0.2709441879983215,
          "c_pct": 0.5374989509022241,
          "f_pct": 0.1915568610994545,
          "goal_pct": 0.19424999999999998
        }
      },
      "portions": {
        "P01": [
          {
            "food_id": "A027",
            "food": "Pan baguette",
            "grams": 75.0,
            "note": "",
            "state": "producto"
          },
          {
            "food_id": "A028",
            "food": "Pechuga de pavo 92%",
            "grams": 75.0,
            "note": "Mercadona",
            "state": "producto"
          },
          {
            "food_id": "A006",
            "food": "Aceite de oliva virgen extra",
            "grams": 3.0,
            "note": "≈3 ml",
            "state": "producto"
          },
          {
            "food_id": "A029",
            "food": "Tomate rallado",
            "grams": 100.0,
            "note": "tomate natural rallado",
            "state": "crudo"
          }
        ],
        "P02": [
          {
            "food_id": "A027",
            "food": "Pan baguette",
            "grams": 55.0,
            "note": "",
            "state": "producto"
          },
          {
            "food_id": "A028",
            "food": "Pechuga de pavo 92%",
            "grams": 55.0,
            "note": "Mercadona",
            "state": "producto"
          },
          {
            "food_id": "A006",
            "food": "Aceite de oliva virgen extra",
            "grams": 2.0,
            "note": "≈2 ml",
            "state": "producto"
          },
          {
            "food_id": "A029",
            "food": "Tomate rallado",
            "grams": 75.0,
            "note": "tomate natural rallado",
            "state": "crudo"
          }
        ]
      },
      "code": "REC-011"
    },
    "R012": {
      "id": "R012",
      "version": "1.2",
      "name": "Campero de espelta con huevo, pechuga y Havarti",
      "type": "CENA",
      "status": "ACTIVA",
      "tags": [
        "TOSTA",
        "HUEVO",
        "HAVARTI",
        "ALTA_PROTEINA",
        "RAPIDA",
        "MERCADONA"
      ],
      "notes": "Mantener la receta base tal como está y añadir tomate y lechuga. Si se necesita una cena con más o menos energía, utilizar el control de calorías de la propia receta en Nutriplan. Añadir 30 g de yogur griego ligero con especias como salsa. Pan integral 100% espelta: 70 g = 2 rebanadas, cantidad fija. El resultado nutricional se recalcula a partir de los gramos finales visibles.",
      "image": null,
      "image_status": "PENDIENTE",
      "summary": {
        "P01": {
          "kcal": 401.0950704225352,
          "protein": 33.9287323943662,
          "carbs": 32.90788732394366,
          "fat": 14.156338028149012,
          "p_pct": 0.3437966283116366,
          "c_pct": 0.3334525020071095,
          "f_pct": 0.3227508696812539,
          "goal_pct": 0.20568977970386418
        },
        "P02": {
          "kcal": 373.74507042253515,
          "protein": 30.308732394366192,
          "carbs": 31.657887323943665,
          "fat": 13.116338028149013,
          "p_pct": 0.3313212619315205,
          "c_pct": 0.34606960930522424,
          "f_pct": 0.32260912876325515,
          "goal_pct": 0.2669607645875251
        }
      },
      "portions": {
        "P01": [
          {
            "food_id": "A059",
            "food": "Pan integral 100% espelta",
            "grams": 70.0,
            "note": "2 rebanadas de 35 g · cantidad fija",
            "state": "producto"
          },
          {
            "food_id": "A028",
            "food": "Pechuga 92% Hacendado",
            "grams": 50.0,
            "note": "Hacendado",
            "state": "producto"
          },
          {
            "food_id": "A013",
            "food": "Queso Havarti light",
            "grams": 25.0,
            "note": "1 loncha",
            "state": "producto"
          },
          {
            "food_id": "A016",
            "food": "Huevo entero",
            "grams": 60.0,
            "note": "1 huevo",
            "state": "crudo"
          },
          {
            "food_id": "A029",
            "food": "Tomate",
            "grams": 100.0,
            "note": "rodajas o rallado",
            "state": "crudo"
          },
          {
            "food_id": "A030",
            "food": "Lechuga",
            "grams": 50.0,
            "note": "",
            "state": "crudo"
          },
          {
            "food_id": "A007",
            "food": "Yogur griego natural",
            "grams": 30.0,
            "note": "salsa de yogur con especias",
            "state": "producto"
          }
        ],
        "P02": [
          {
            "food_id": "A059",
            "food": "Pan integral 100% espelta",
            "grams": 70.0,
            "note": "2 rebanadas de 35 g · cantidad fija",
            "state": "producto"
          },
          {
            "food_id": "A028",
            "food": "Pechuga 92% Hacendado",
            "grams": 40.0,
            "note": "",
            "state": "producto"
          },
          {
            "food_id": "A013",
            "food": "Queso Havarti light",
            "grams": 20.0,
            "note": "",
            "state": "producto"
          },
          {
            "food_id": "A016",
            "food": "Huevo entero",
            "grams": 60.0,
            "note": "1 huevo",
            "state": "crudo"
          },
          {
            "food_id": "A029",
            "food": "Tomate",
            "grams": 80.0,
            "note": "rodajas o rallado",
            "state": "crudo"
          },
          {
            "food_id": "A030",
            "food": "Lechuga",
            "grams": 40.0,
            "note": "",
            "state": "crudo"
          },
          {
            "food_id": "A007",
            "food": "Yogur griego natural",
            "grams": 30.0,
            "note": "salsa de yogur con especias",
            "state": "producto"
          }
        ]
      },
      "code": "REC-012",
      "locked_food_ids": [
        "A059"
      ],
      "calculation_mode": "INGREDIENT_SUM"
    },
    "R013": {
      "id": "R013",
      "version": "1.1",
      "name": "Tallarines carbonara cremosa con pollo y champiñones",
      "type": "COMIDA",
      "status": "ACTIVA",
      "tags": [
        "PASTA",
        "POLLO",
        "CARBONARA",
        "CHAMPIÑONES",
        "COCINA_COMPARTIDA",
        "ALTA_PROTEINA"
      ],
      "notes": "Pimienta negra abundante; ajo en polvo y una pizca de nuez moscada opcionales. Cocer la pasta aparte. Cocinar cebolla, pollo y champiñones. Una vez terminada y pesada toda la preparación, repartir aproximadamente 57% para Persona 1 y 43% para Persona 2.",
      "image": null,
      "image_status": "PENDIENTE",
      "summary": {
        "P01": {
          "kcal": 567.0,
          "protein": 46.7,
          "carbs": 76.4,
          "fat": 9.7,
          "p_pct": 0.32223563912368464,
          "c_pct": 0.5271692254614456,
          "f_pct": 0.15059513541486974,
          "goal_pct": 0.33076923076923076
        },
        "P02": {
          "kcal": 407.0,
          "protein": 33.7,
          "carbs": 57.4,
          "fat": 5.7,
          "p_pct": 0.32427231176329085,
          "c_pct": 0.552321385614626,
          "f_pct": 0.12340630262208324,
          "goal_pct": 0.3464285714285714
        }
      },
      "portions": {
        "P01": [
          {
            "food_id": "A031",
            "food": "Tallarines secos",
            "grams": 82.6,
            "note": "pesar en seco",
            "state": "seco"
          },
          {
            "food_id": "A001",
            "food": "Pechuga de pollo",
            "grams": 108.3,
            "note": "",
            "state": "crudo"
          },
          {
            "food_id": "A005",
            "food": "Leche evaporada parcialmente desnatada",
            "grams": 114.0,
            "note": "≈200 ml",
            "state": "producto"
          },
          {
            "food_id": "A003",
            "food": "Champiñones laminados",
            "grams": 48.4,
            "note": "peso escurrido",
            "state": "peso escurrido"
          },
          {
            "food_id": "A004",
            "food": "Cebolla",
            "grams": 45.6,
            "note": "",
            "state": "crudo"
          },
          {
            "food_id": "A032",
            "food": "Pimienta negra",
            "grams": 0.5,
            "note": "al gusto",
            "state": "producto"
          },
          {
            "food_id": "A033",
            "food": "Ajo en polvo",
            "grams": 0.5,
            "note": "opcional",
            "state": "producto"
          },
          {
            "food_id": "A034",
            "food": "Nuez moscada",
            "grams": 0.2,
            "note": "opcional",
            "state": "producto"
          }
        ],
        "P02": [
          {
            "food_id": "A031",
            "food": "Tallarines secos",
            "grams": 62.4,
            "note": "pesar en seco",
            "state": "seco"
          },
          {
            "food_id": "A001",
            "food": "Pechuga de pollo",
            "grams": 81.7,
            "note": "",
            "state": "crudo"
          },
          {
            "food_id": "A005",
            "food": "Leche evaporada parcialmente desnatada",
            "grams": 86.0,
            "note": "≈200 ml",
            "state": "producto"
          },
          {
            "food_id": "A003",
            "food": "Champiñones laminados",
            "grams": 36.5,
            "note": "peso escurrido",
            "state": "peso escurrido"
          },
          {
            "food_id": "A004",
            "food": "Cebolla",
            "grams": 34.4,
            "note": "",
            "state": "crudo"
          },
          {
            "food_id": "A032",
            "food": "Pimienta negra",
            "grams": 0.5,
            "note": "al gusto",
            "state": "producto"
          },
          {
            "food_id": "A033",
            "food": "Ajo en polvo",
            "grams": 0.5,
            "note": "opcional",
            "state": "producto"
          },
          {
            "food_id": "A034",
            "food": "Nuez moscada",
            "grams": 0.2,
            "note": "opcional",
            "state": "producto"
          }
        ]
      },
      "mix_mode": "joint",
      "code": "REC-013"
    },
    "R014": {
      "id": "R014",
      "code": "REC-014",
      "version": "1.2",
      "name": "Wrap de pollo, Havarti y salsa de yogur",
      "type": "CENA",
      "status": "ACTIVA",
      "tags": [
        "WRAP",
        "POLLO",
        "HAVARTI",
        "SALSA_YOGUR",
        "RAPIDA",
        "MERCADONA"
      ],
      "notes": "Wrap con pechuga de pollo, 1 tortilla de avena completa de 60 g, Havarti light, cebolla, lechuga y salsa de yogur con especias. Sin huevo. La tortilla es una unidad indivisible: siempre 60 g para Persona 1 y Persona 2 y no participa en el escalado.",
      "image": null,
      "image_status": "PENDIENTE",
      "summary": {
        "P01": {
          "kcal": 370.75,
          "protein": 36.2,
          "carbs": 31.4,
          "fat": 10.45,
          "p_pct": 0.3973110166003567,
          "c_pct": 0.3446288928522431,
          "f_pct": 0.2580600905474002,
          "goal_pct": 0.23012820512820512
        },
        "P02": {
          "kcal": 325.05,
          "protein": 29.95,
          "carbs": 30.9,
          "fat": 8.6,
          "p_pct": 0.3734413965087282,
          "c_pct": 0.38528678304239405,
          "f_pct": 0.24127182044887782,
          "goal_pct": 0.2571428571428571
        }
      },
      "portions": {
        "P01": [
          {
            "food_id": "A004",
            "food": "Cebolla",
            "grams": 30.0,
            "note": "",
            "state": "crudo"
          },
          {
            "food_id": "A021",
            "food": "Tortillas de avena 51% Hacendado",
            "grams": 60.0,
            "note": "1 tortilla completa de 60 g · indivisible",
            "state": "producto"
          },
          {
            "food_id": "A001",
            "food": "Pechuga de pollo",
            "grams": 75.0,
            "note": "sustituye al pavo de la receta original",
            "state": "crudo"
          },
          {
            "food_id": "A013",
            "food": "Queso Havarti light",
            "grams": 25.0,
            "note": "1 loncha",
            "state": "producto"
          },
          {
            "food_id": "A030",
            "food": "Lechuga",
            "grams": 20.0,
            "note": "",
            "state": "crudo"
          },
          {
            "food_id": "A007",
            "food": "Yogur griego natural",
            "grams": 60.0,
            "note": "salsa de yogur con especias",
            "state": "producto"
          }
        ],
        "P02": [
          {
            "food_id": "A004",
            "food": "Cebolla",
            "grams": 25.0,
            "note": "",
            "state": "crudo"
          },
          {
            "food_id": "A021",
            "food": "Tortillas de avena 51% Hacendado",
            "grams": 60.0,
            "note": "1 tortilla completa de 60 g · indivisible",
            "state": "producto"
          },
          {
            "food_id": "A001",
            "food": "Pechuga de pollo",
            "grams": 60.0,
            "note": "",
            "state": "crudo"
          },
          {
            "food_id": "A013",
            "food": "Queso Havarti light",
            "grams": 20.0,
            "note": "",
            "state": "producto"
          },
          {
            "food_id": "A030",
            "food": "Lechuga",
            "grams": 20.0,
            "note": "",
            "state": "crudo"
          },
          {
            "food_id": "A007",
            "food": "Yogur griego natural",
            "grams": 45.0,
            "note": "salsa de yogur con especias",
            "state": "producto"
          }
        ]
      },
      "locked_food_ids": [
        "A021"
      ],
      "hard_locked_food_ids": [
        "A021"
      ]
    },
    "R015": {
      "id": "R015",
      "code": "REC-015",
      "version": "2.0",
      "name": "Overnight oats con cacao",
      "type": "DESAYUNO",
      "status": "ACTIVA",
      "tags": [
        "OVERNIGHT_OATS",
        "AVENA",
        "CACAO",
        "DESAYUNO",
        "PREPARACION_ANTICIPADA"
      ],
      "notes": "Preparar la noche anterior mezclando los copos de avena, chía, cacahuete desgrasado, yogur, leche desnatada y cacao puro. Dejar reposar en la nevera. No lleva proteína en polvo ni muesli. El café con leche se registra por separado.",
      "image": "images/REC-015.webp",
      "image_status": "GENERADA",
      "summary": {
        "P01": {
          "kcal": 266.2,
          "protein": 17.645,
          "carbs": 27.0,
          "fat": 8.149999999999999,
          "p_pct": 0.2801571865200651,
          "c_pct": 0.4286905092684476,
          "f_pct": 0.2911523042114873,
          "goal_pct": 0.19282051282051282
        },
        "P02": {
          "kcal": 212.16,
          "protein": 13.836,
          "carbs": 21.28,
          "fat": 6.66,
          "p_pct": 0.2761621524520469,
          "c_pct": 0.424742021117343,
          "f_pct": 0.29909582643061017,
          "goal_pct": 0.21428571428571427
        }
      },
      "portions": {
        "P01": [
          {
            "food_id": "A021",
            "food": "Copos de avena",
            "grams": 25.0,
            "note": "",
            "state": "seco"
          },
          {
            "food_id": "A036",
            "food": "Semillas de chía Hacendado",
            "grams": 10.0,
            "note": "",
            "state": "seco"
          },
          {
            "food_id": "A037",
            "food": "Cacahuete desgrasado en polvo",
            "grams": 5.0,
            "note": "",
            "state": "polvo"
          },
          {
            "food_id": "A007",
            "food": "Yogur griego ligero natural",
            "grams": 60.0,
            "note": "",
            "state": "producto"
          },
          {
            "food_id": "A005",
            "food": "Leche desnatada",
            "grams": 150.0,
            "note": "150 ml dentro del overnight",
            "state": "producto"
          },
          {
            "food_id": "A026",
            "food": "Cacao puro desgrasado en polvo",
            "grams": 4.0,
            "note": "",
            "state": "producto"
          }
        ],
        "P02": [
          {
            "food_id": "A021",
            "food": "Copos de avena",
            "grams": 20.0,
            "note": "",
            "state": "seco"
          },
          {
            "food_id": "A036",
            "food": "Semillas de chía Hacendado",
            "grams": 8.0,
            "note": "",
            "state": "seco"
          },
          {
            "food_id": "A037",
            "food": "Cacahuete desgrasado en polvo",
            "grams": 4.0,
            "note": "",
            "state": "polvo"
          },
          {
            "food_id": "A007",
            "food": "Yogur griego ligero natural",
            "grams": 50.0,
            "note": "",
            "state": "producto"
          },
          {
            "food_id": "A005",
            "food": "Leche desnatada",
            "grams": 120.0,
            "note": "120 ml dentro del overnight",
            "state": "producto"
          },
          {
            "food_id": "A026",
            "food": "Cacao puro desgrasado en polvo",
            "grams": 3.0,
            "note": "",
            "state": "producto"
          }
        ]
      }
    },
    "R016": {
      "id": "R016",
      "mix_mode": "joint",
      "code": "REC-016",
      "version": "1.1",
      "name": "Tallarines con salmón y verduras",
      "type": "COMIDA",
      "status": "ACTIVA",
      "tags": [
        "SALMON",
        "TALLARINES",
        "PASTA",
        "PIMIENTO",
        "CALABACIN",
        "CEBOLLA"
      ],
      "notes": "Cocer los tallarines aparte. Saltear pimiento, calabacín y cebolla en sartén antiadherente y añadir el salmón en dados. Mezclar con la pasta. Condimentar con pimienta negra, ajo en polvo, perejil o eneldo y unas gotas de limón. No se añade aceite de serie porque el salmón ya aporta suficiente grasa. Añadir 25 g de salsa de soja Hacendado para Persona 1 y 19 g para Persona 2. No añadir sal extra.",
      "image": null,
      "image_status": "PENDIENTE",
      "summary": {
        "P01": {
          "kcal": 607.55,
          "protein": 39.175,
          "carbs": 61.275,
          "fat": 22.535,
          "p_pct": 0.2591731928582652,
          "c_pct": 0.4053819372658634,
          "f_pct": 0.3354448698758714,
          "goal_pct": 0.3031025641025641
        },
        "P02": {
          "kcal": 466.07200000000006,
          "protein": 30.0766,
          "carbs": 46.884600000000006,
          "fat": 17.3218,
          "p_pct": 0.25942584330477575,
          "c_pct": 0.40440331995661377,
          "f_pct": 0.33617083673861053,
          "goal_pct": 0.3238571428571429
        }
      },
      "portions": {
        "P01": [
          {
            "food_id": "A017",
            "food": "Salmón en lomos",
            "grams": 130.0,
            "note": "",
            "state": "crudo"
          },
          {
            "food_id": "A031",
            "food": "Tallarines secos",
            "grams": 65.0,
            "note": "pesar en seco",
            "state": "seco"
          },
          {
            "food_id": "A035",
            "food": "Pimiento",
            "grams": 80.0,
            "note": "",
            "state": "crudo"
          },
          {
            "food_id": "A038",
            "food": "Calabacín",
            "grams": 120.0,
            "note": "",
            "state": "crudo"
          },
          {
            "food_id": "A004",
            "food": "Cebolla",
            "grams": 60.0,
            "note": "",
            "state": "crudo"
          },
          {
            "food_id": "A049",
            "food": "Salsa de soja Hacendado",
            "grams": 25.0,
            "note": "añadir al final; no añadir sal",
            "state": "producto"
          }
        ],
        "P02": [
          {
            "food_id": "A017",
            "food": "Salmón en lomos",
            "grams": 100.0,
            "note": "",
            "state": "crudo"
          },
          {
            "food_id": "A031",
            "food": "Tallarines secos",
            "grams": 50.0,
            "note": "pesar en seco",
            "state": "seco"
          },
          {
            "food_id": "A035",
            "food": "Pimiento",
            "grams": 60.0,
            "note": "",
            "state": "crudo"
          },
          {
            "food_id": "A038",
            "food": "Calabacín",
            "grams": 90.0,
            "note": "",
            "state": "crudo"
          },
          {
            "food_id": "A004",
            "food": "Cebolla",
            "grams": 45.0,
            "note": "",
            "state": "crudo"
          },
          {
            "food_id": "A049",
            "food": "Salsa de soja Hacendado",
            "grams": 19.2,
            "note": "añadir al final; no añadir sal",
            "state": "producto"
          }
        ]
      }
    },
    "R017": {
      "id": "R017",
      "code": "REC-017",
      "version": "1.0",
      "name": "Tallarines con atún al natural y tomate",
      "type": "CENA",
      "status": "ACTIVA",
      "tags": [
        "CENA_HC",
        "CARGA_HIDRATOS",
        "TALLARINES",
        "ATUN",
        "TOMATE",
        "PASTA"
      ],
      "notes": "Cena alta en hidratos pensada especialmente para días previos a una salida de bicicleta. Para los dos se utiliza el tarro entero de 400 g de tomate frito: 220 g para Persona 1 y 180 g para Persona 2. Cocer los tallarines, calentar el tomate y mezclar con el atún escurrido. Condimentar con orégano, pimienta negra y ajo en polvo. No añadir aceite.",
      "image": null,
      "image_status": "PENDIENTE",
      "summary": {
        "P01": {
          "kcal": 637.2,
          "protein": 37.08,
          "carbs": 98.42,
          "fat": 9.3,
          "p_pct": 0.2370465079111395,
          "c_pct": 0.62918331468755,
          "f_pct": 0.13377017740131053,
          "goal_pct": 0.3267692307692308
        },
        "P02": {
          "kcal": 476.90000000000003,
          "protein": 28.419999999999998,
          "carbs": 72.0,
          "fat": 7.41,
          "p_pct": 0.24271409355851142,
          "c_pct": 0.6148984776992549,
          "f_pct": 0.1423874287422337,
          "goal_pct": 0.3406428571428572
        }
      },
      "portions": {
        "P01": [
          {
            "food_id": "A031",
            "food": "Tallarines secos",
            "grams": 100.0,
            "note": "pesar en seco",
            "state": "seco"
          },
          {
            "food_id": "A041",
            "food": "Atún al natural Hacendado",
            "grams": 100.0,
            "note": "peso escurrido",
            "state": "peso escurrido"
          },
          {
            "food_id": "A040",
            "food": "Tomate frito Hacendado",
            "grams": 220.0,
            "note": "",
            "state": "producto"
          }
        ],
        "P02": [
          {
            "food_id": "A031",
            "food": "Tallarines secos",
            "grams": 70.0,
            "note": "pesar en seco",
            "state": "seco"
          },
          {
            "food_id": "A041",
            "food": "Atún al natural Hacendado",
            "grams": 80.0,
            "note": "peso escurrido",
            "state": "peso escurrido"
          },
          {
            "food_id": "A040",
            "food": "Tomate frito Hacendado",
            "grams": 180.0,
            "note": "",
            "state": "producto"
          }
        ]
      }
    },
    "R018": {
      "id": "R018",
      "code": "REC-018",
      "version": "2.0",
      "name": "Pan de molde con mermelada",
      "type": "DESAYUNO",
      "types": [
        "DESAYUNO",
        "MERIENDA"
      ],
      "status": "ACTIVA",
      "tags": [
        "DESAYUNO",
        "MERIENDA",
        "CARGA_HIDRATOS",
        "PAN",
        "MERMELADA",
        "CAFE"
      ],
      "locked_food_ids": [
        "A011",
        "A042",
        "A024",
        "A039"
      ],
      "notes": "Cantidad bloqueada para Persona 1: 2 rebanadas de pan de molde Hacendado (28 g cada una; 56 g total) + 30 g de mermelada de melocotón por rebanada (60 g total). Disponible como desayuno y merienda de carga de hidratos. El café con leche se registra por separado en la sección Cafés.",
      "image": "images/REC-018.webp",
      "image_status": "GENERADA",
      "summary": {
        "P01": {
          "kcal": 249.12,
          "protein": 4.892000000000001,
          "carbs": 52.32,
          "fat": 1.736,
          "p_pct": 0.08004188618737526,
          "c_pct": 0.8560489544814948,
          "f_pct": 0.06390915933112995,
          "goal_pct": 0.15483076923076924
        },
        "P02": {
          "kcal": 187.45,
          "protein": 4.790000000000001,
          "carbs": 38.629999999999995,
          "fat": 1.322,
          "p_pct": 0.10324499671297248,
          "c_pct": 0.8326418002133874,
          "f_pct": 0.0641132030736402,
          "goal_pct": 0.17160714285714285
        }
      },
      "portions": {
        "P01": [
          {
            "food_id": "A011",
            "food": "Pan de molde Hacendado",
            "grams": 56.0,
            "note": "2 rebanadas de 28 g",
            "state": "producto"
          },
          {
            "food_id": "A042",
            "food": "Mermelada de melocotón Hacendado",
            "grams": 60.0,
            "note": "30 g por rebanada",
            "state": "producto"
          }
        ],
        "P02": [
          {
            "food_id": "A011",
            "food": "Pan de molde grueso",
            "grams": 51.0,
            "note": "1 rebanada",
            "state": "producto"
          },
          {
            "food_id": "A042",
            "food": "Mermelada de fresa Hacendado",
            "grams": 30.0,
            "note": "30 g",
            "state": "producto"
          }
        ]
      },
      "locked_portion_P01": true,
      "locked_ingredients_P01": [
        "A011",
        "A042",
        "A024"
      ]
    },
    "R019": {
      "id": "R019",
      "code": "REC-019",
      "version": "1.0",
      "name": "Melocotón",
      "type": "FRUTA",
      "status": "ACTIVA",
      "tags": [
        "FRUTA",
        "POSTRE",
        "MELOCOTON"
      ],
      "notes": "Fruta fresca después de comer. Peso comestible orientativo.",
      "image": null,
      "image_status": "PENDIENTE",
      "summary": {
        "P01": {
          "kcal": 58.5,
          "protein": 1.35,
          "carbs": 14.25,
          "fat": 0.45,
          "p_pct": 0.08126410835214447,
          "c_pct": 0.8577878103837472,
          "f_pct": 0.06094808126410835,
          "goal_pct": 0.03
        },
        "P02": {
          "kcal": 50.7,
          "protein": 1.17,
          "carbs": 12.35,
          "fat": 0.39,
          "p_pct": 0.08126410835214448,
          "c_pct": 0.8577878103837472,
          "f_pct": 0.06094808126410836,
          "goal_pct": 0.03621428571428572
        }
      },
      "portions": {
        "P01": [
          {
            "food_id": "A043",
            "food": "Melocotón",
            "grams": 150.0,
            "note": "≈ 1 pieza mediana; peso comestible",
            "state": "crudo"
          }
        ],
        "P02": [
          {
            "food_id": "A043",
            "food": "Melocotón",
            "grams": 130.0,
            "note": "peso comestible",
            "state": "crudo"
          }
        ]
      }
    },
    "R020": {
      "id": "R020",
      "code": "REC-020",
      "version": "1.0",
      "name": "Plátano",
      "type": "FRUTA",
      "status": "ACTIVA",
      "tags": [
        "FRUTA",
        "POSTRE",
        "PLATANO"
      ],
      "notes": "Fruta fresca después de comer. Peso sin piel.",
      "image": null,
      "image_status": "PENDIENTE",
      "summary": {
        "P01": {
          "kcal": 106.8,
          "protein": 1.32,
          "carbs": 27.36,
          "fat": 0.36,
          "p_pct": 0.04476093591047813,
          "c_pct": 0.9277721261444558,
          "f_pct": 0.027466937945066123,
          "goal_pct": 0.054769230769230764
        },
        "P02": {
          "kcal": 89.0,
          "protein": 1.1,
          "carbs": 22.8,
          "fat": 0.3,
          "p_pct": 0.044760935910478125,
          "c_pct": 0.9277721261444557,
          "f_pct": 0.02746693794506612,
          "goal_pct": 0.06357142857142857
        }
      },
      "portions": {
        "P01": [
          {
            "food_id": "A008",
            "food": "Plátano",
            "grams": 120.0,
            "note": "≈ 1 plátano mediano; sin piel",
            "state": "crudo"
          }
        ],
        "P02": [
          {
            "food_id": "A008",
            "food": "Plátano",
            "grams": 100.0,
            "note": "sin piel",
            "state": "crudo"
          }
        ]
      }
    },
    "R021": {
      "id": "R021",
      "code": "REC-021",
      "version": "1.0",
      "name": "Sandía",
      "type": "FRUTA",
      "status": "ACTIVA",
      "tags": [
        "FRUTA",
        "POSTRE",
        "SANDIA"
      ],
      "notes": "Fruta fresca después de comer. Peso de la pulpa.",
      "image": null,
      "image_status": "PENDIENTE",
      "summary": {
        "P01": {
          "kcal": 75.0,
          "protein": 1.5,
          "carbs": 19.0,
          "fat": 0.5,
          "p_pct": 0.06936416184971098,
          "c_pct": 0.8786127167630058,
          "f_pct": 0.05202312138728324,
          "goal_pct": 0.038461538461538464
        },
        "P02": {
          "kcal": 60.0,
          "protein": 1.2,
          "carbs": 15.2,
          "fat": 0.4,
          "p_pct": 0.06936416184971099,
          "c_pct": 0.8786127167630059,
          "f_pct": 0.052023121387283246,
          "goal_pct": 0.04285714285714286
        }
      },
      "portions": {
        "P01": [
          {
            "food_id": "A044",
            "food": "Sandía",
            "grams": 250.0,
            "note": "peso de la pulpa",
            "state": "crudo"
          }
        ],
        "P02": [
          {
            "food_id": "A044",
            "food": "Sandía",
            "grams": 200.0,
            "note": "peso de la pulpa",
            "state": "crudo"
          }
        ]
      }
    },
    "R022": {
      "id": "R022",
      "code": "REC-022",
      "version": "1.0",
      "name": "Pudin proteico con cereales",
      "type": "MERIENDA",
      "status": "ACTIVA",
      "tags": [
        "PUDIN",
        "PROTEICO",
        "CEREALES",
        "CACAO",
        "MERIENDA",
        "RACION_FIJA"
      ],
      "notes": "Ración fija. No recalcular ingrediente por ingrediente. Mezclar 200 ml de leche desnatada con 30 g de Impact Whey Protein MyProtein sin sabor y 3 g de cacao. Hidratar 2 hojas de gelatina neutra, disolverlas e incorporarlas a la mezcla. Enfriar hasta que cuaje y añadir 20 g de copos de cereales sin azúcares añadidos al servir.",
      "image": null,
      "image_status": "PENDIENTE",
      "summary": {
        "P01": {
          "kcal": 267.0,
          "protein": 32.4,
          "carbs": 27.3,
          "fat": 2.9,
          "p_pct": 0.4892412231030577,
          "c_pct": 0.4122310305775764,
          "f_pct": 0.09852774631936578,
          "goal_pct": 0.13692307692307693
        },
        "P02": {
          "kcal": 267.0,
          "protein": 32.4,
          "carbs": 27.3,
          "fat": 2.9,
          "p_pct": 0.4892412231030577,
          "c_pct": 0.4122310305775764,
          "f_pct": 0.09852774631936578,
          "goal_pct": 0.19071428571428573
        }
      },
      "portions": {
        "P01": [
          {
            "food_id": "A005",
            "food": "Leche desnatada",
            "grams": 200.0,
            "note": "200 ml",
            "state": "producto"
          },
          {
            "food_id": "A009",
            "food": "Impact Whey Protein MyProtein sin sabor",
            "grams": 30.0,
            "note": "",
            "state": "polvo"
          },
          {
            "food_id": "A026",
            "food": "Cacao puro desgrasado en polvo",
            "grams": 3.0,
            "note": "",
            "state": "producto"
          },
          {
            "food_id": "A045",
            "food": "Gelatina neutra en hojas",
            "grams": 2.0,
            "note": "2 hojas",
            "state": "producto"
          },
          {
            "food_id": "A046",
            "food": "Copos de cereales sin azúcares añadidos Mercadona",
            "grams": 20.0,
            "note": "añadir al servir",
            "state": "producto"
          }
        ],
        "P02": [
          {
            "food_id": "A005",
            "food": "Leche desnatada",
            "grams": 200.0,
            "note": "200 ml",
            "state": "producto"
          },
          {
            "food_id": "A009",
            "food": "Impact Whey Protein MyProtein sin sabor",
            "grams": 30.0,
            "note": "",
            "state": "polvo"
          },
          {
            "food_id": "A026",
            "food": "Cacao puro desgrasado en polvo",
            "grams": 3.0,
            "note": "",
            "state": "producto"
          },
          {
            "food_id": "A045",
            "food": "Gelatina neutra en hojas",
            "grams": 2.0,
            "note": "2 hojas",
            "state": "producto"
          },
          {
            "food_id": "A046",
            "food": "Copos de cereales sin azúcares añadidos Mercadona",
            "grams": 20.0,
            "note": "añadir al servir",
            "state": "producto"
          }
        ]
      },
      "locked_portion_P01": true,
      "locked_portion_P02": true,
      "locked_ingredients_P01": [
        "A005",
        "A009",
        "A026",
        "A045",
        "A046"
      ],
      "locked_ingredients_P02": [
        "A005",
        "A009",
        "A026",
        "A045",
        "A046"
      ]
    },
    "R023": {
      "id": "R023",
      "mix_mode": "joint",
      "code": "REC-023",
      "version": "1.1",
      "name": "Merluza con arroz y verduras asadas",
      "type": "COMIDA",
      "status": "ACTIVA",
      "tags": [
        "MERLUZA",
        "ARROZ",
        "VERDURAS",
        "COMIDA",
        "ALTA_PROTEINA"
      ],
      "notes": "Asar calabacín, pimiento y cebolla con el AOVE medido. Cocinar los lomos de merluza a la plancha, horno o airfryer y servir con el arroz ultracongelado ya preparado. Añadir la salsa de soja al final. Condimentar con ajo, pimienta, perejil y limón. No añadir sal extra.",
      "image": null,
      "image_status": "PENDIENTE",
      "summary": {
        "P01": {
          "kcal": 599.6999999999999,
          "protein": 47.364999999999995,
          "carbs": 83.545,
          "fat": 8.499999999999998,
          "p_pct": 0.315693004965508,
          "c_pct": 0.5568367380944447,
          "f_pct": 0.1274702569400473,
          "goal_pct": 0.299076923076923
        },
        "P02": {
          "kcal": 445.44000000000005,
          "protein": 35.487,
          "carbs": 61.117000000000004,
          "fat": 6.636,
          "p_pct": 0.31816918456090015,
          "c_pct": 0.5479625229748509,
          "f_pct": 0.1338682924642489,
          "goal_pct": 0.3092142857142857
        }
      },
      "portions": {
        "P01": [
          {
            "food_id": "A047",
            "food": "Lomos de merluza",
            "grams": 200.0,
            "note": "",
            "state": "crudo"
          },
          {
            "food_id": "A048",
            "food": "Arroz cocido Hacendado",
            "grams": 250.0,
            "note": "peso ya cocido",
            "state": "cocido"
          },
          {
            "food_id": "A038",
            "food": "Calabacín",
            "grams": 120.0,
            "note": "verdura asada",
            "state": "crudo"
          },
          {
            "food_id": "A035",
            "food": "Pimiento",
            "grams": 80.0,
            "note": "verdura asada",
            "state": "crudo"
          },
          {
            "food_id": "A004",
            "food": "Cebolla",
            "grams": 50.0,
            "note": "verdura asada",
            "state": "crudo"
          },
          {
            "food_id": "A006",
            "food": "Aceite de oliva virgen extra",
            "grams": 5.0,
            "note": "para las verduras",
            "state": "producto"
          },
          {
            "food_id": "A049",
            "food": "Salsa de soja Hacendado",
            "grams": 25.0,
            "note": "añadir al final; no añadir sal extra",
            "state": "producto"
          }
        ],
        "P02": [
          {
            "food_id": "A047",
            "food": "Lomos de merluza",
            "grams": 150.0,
            "note": "",
            "state": "crudo"
          },
          {
            "food_id": "A048",
            "food": "Arroz cocido Hacendado",
            "grams": 180.0,
            "note": "peso ya cocido",
            "state": "cocido"
          },
          {
            "food_id": "A038",
            "food": "Calabacín",
            "grams": 100.0,
            "note": "verdura asada",
            "state": "crudo"
          },
          {
            "food_id": "A035",
            "food": "Pimiento",
            "grams": 60.0,
            "note": "verdura asada",
            "state": "crudo"
          },
          {
            "food_id": "A004",
            "food": "Cebolla",
            "grams": 40.0,
            "note": "verdura asada",
            "state": "crudo"
          },
          {
            "food_id": "A006",
            "food": "Aceite de oliva virgen extra",
            "grams": 4.0,
            "note": "para las verduras",
            "state": "producto"
          },
          {
            "food_id": "A049",
            "food": "Salsa de soja Hacendado",
            "grams": 19.0,
            "note": "añadir al final; no añadir sal extra",
            "state": "producto"
          }
        ]
      }
    },
    "R024": {
      "id": "R024",
      "code": "REC-024",
      "version": "2.0",
      "name": "Queso fresco batido 0% con fruta",
      "type": "MERIENDA",
      "status": "ACTIVA",
      "tags": [
        "MERIENDA",
        "QUESO_FRESCO_BATIDO",
        "FRUTA",
        "SIN_CHOCOLATE",
        "SIN_WHEY"
      ],
      "notes": "Persona 1: 250 g de queso fresco batido 0% + 1 melocotón (150 g comestibles) + 1 pieza de otra fruta (150 g orientativos). Canela al gusto. Sin gotas de chocolate y sin bebida de soja. Persona 2: 150 g de queso fresco batido 0% + 120 g de melocotón, también sin chocolate. Los macros de la fruta adicional de Persona 1 son orientativos y cambian según la fruta elegida.",
      "image": null,
      "image_status": "PENDIENTE",
      "summary": {
        "P01": {
          "kcal": 248.5,
          "protein": 22.1,
          "carbs": 41.75,
          "fat": 1.5,
          "p_pct": 0.32874674600223136,
          "c_pct": 0.6210487169951655,
          "f_pct": 0.0502045370026032,
          "goal_pct": 0.12743589743589745
        },
        "P02": {
          "kcal": 115.8,
          "protein": 13.08,
          "carbs": 16.65,
          "fat": 0.81,
          "p_pct": 0.41454718326598533,
          "c_pct": 0.5276919420014262,
          "f_pct": 0.05776087473258854,
          "goal_pct": 0.08271428571428571
        }
      },
      "portions": {
        "P01": [
          {
            "food_id": "A050",
            "food": "Queso fresco batido 0% Hacendado",
            "grams": 250.0,
            "note": "",
            "state": "producto"
          },
          {
            "food_id": "A043",
            "food": "Melocotón",
            "grams": 150.0,
            "note": "≈ 1 pieza mediana; peso comestible",
            "state": "crudo"
          },
          {
            "food_id": "A062",
            "food": "Otra fruta",
            "grams": 150.0,
            "note": "1 pieza aprox.; elegir la fruta disponible",
            "state": "crudo"
          }
        ],
        "P02": [
          {
            "food_id": "A050",
            "food": "Queso fresco batido 0% Hacendado",
            "grams": 150.0,
            "note": "",
            "state": "producto"
          },
          {
            "food_id": "A043",
            "food": "Melocotón",
            "grams": 120.0,
            "note": "peso comestible",
            "state": "crudo"
          }
        ]
      }
    },
    "R025": {
      "id": "R025",
      "mix_mode": "joint",
      "code": "REC-025",
      "version": "1.0",
      "name": "Ensalada de pasta, pollo, huevo y salsa de yogur",
      "type": "COMIDA",
      "status": "ACTIVA",
      "tags": [
        "ENSALADA",
        "PASTA",
        "POLLO",
        "HUEVO",
        "SALSA_YOGUR",
        "COMIDA"
      ],
      "notes": "Receta recuperada. Sin mozzarella y sin aceite añadido. Pasta pesada en seco y pollo pesado ya cocinado. La cantidad de verduras corresponde al total combinado de lechuga, tomate, pepino y cebolla. La salsa de yogur es nuestro yogur griego ligero con especias.",
      "image": null,
      "image_status": "PENDIENTE",
      "summary": {
        "P01": {
          "kcal": 567.1,
          "protein": 54.24249999999999,
          "carbs": 58.9325,
          "fat": 11.735,
          "p_pct": 0.3886157455916463,
          "c_pct": 0.42221684891145683,
          "f_pct": 0.18916740549689692,
          "goal_pct": 0.29082051282051286
        },
        "P02": {
          "kcal": 451.70000000000005,
          "protein": 43.16,
          "carbs": 44.965,
          "fat": 10.235000000000001,
          "p_pct": 0.38829099333130906,
          "c_pct": 0.4045297617039461,
          "f_pct": 0.2071792449647448,
          "goal_pct": 0.3226428571428572
        }
      },
      "portions": {
        "P01": [
          {
            "food_id": "A051",
            "food": "Pasta de hélices seca",
            "grams": 60.0,
            "note": "pesar en seco",
            "state": "seco"
          },
          {
            "food_id": "A001",
            "food": "Pechuga de pollo cocinada",
            "grams": 110.0,
            "note": "peso ya cocinado",
            "state": "cocinado"
          },
          {
            "food_id": "A016",
            "food": "Huevo cocido",
            "grams": 60.0,
            "note": "1 unidad",
            "state": "cocido"
          },
          {
            "food_id": "A030",
            "food": "Lechuga",
            "grams": 62.5,
            "note": "parte de la mezcla de verduras",
            "state": "crudo"
          },
          {
            "food_id": "A029",
            "food": "Tomate",
            "grams": 62.5,
            "note": "parte de la mezcla de verduras",
            "state": "crudo"
          },
          {
            "food_id": "A052",
            "food": "Pepino",
            "grams": 62.5,
            "note": "parte de la mezcla de verduras",
            "state": "crudo"
          },
          {
            "food_id": "A004",
            "food": "Cebolla",
            "grams": 62.5,
            "note": "parte de la mezcla de verduras",
            "state": "crudo"
          },
          {
            "food_id": "A007",
            "food": "Yogur griego ligero natural Hacendado",
            "grams": 60.0,
            "note": "salsa de yogur con especias",
            "state": "producto"
          }
        ],
        "P02": [
          {
            "food_id": "A051",
            "food": "Pasta de hélices seca",
            "grams": 45.0,
            "note": "pesar en seco",
            "state": "seco"
          },
          {
            "food_id": "A001",
            "food": "Pechuga de pollo cocinada",
            "grams": 85.0,
            "note": "peso ya cocinado",
            "state": "cocinado"
          },
          {
            "food_id": "A016",
            "food": "Huevo cocido",
            "grams": 60.0,
            "note": "1 unidad",
            "state": "cocido"
          },
          {
            "food_id": "A030",
            "food": "Lechuga",
            "grams": 50.0,
            "note": "parte de la mezcla de verduras",
            "state": "crudo"
          },
          {
            "food_id": "A029",
            "food": "Tomate",
            "grams": 50.0,
            "note": "parte de la mezcla de verduras",
            "state": "crudo"
          },
          {
            "food_id": "A052",
            "food": "Pepino",
            "grams": 50.0,
            "note": "parte de la mezcla de verduras",
            "state": "crudo"
          },
          {
            "food_id": "A004",
            "food": "Cebolla",
            "grams": 50.0,
            "note": "parte de la mezcla de verduras",
            "state": "crudo"
          },
          {
            "food_id": "A007",
            "food": "Yogur griego ligero natural Hacendado",
            "grams": 45.0,
            "note": "salsa de yogur con especias",
            "state": "producto"
          }
        ]
      }
    },
    "R026": {
      "id": "R026",
      "mix_mode": "joint",
      "code": "REC-026",
      "version": "1.0",
      "name": "Ensalada de pasta, pollo, huevo y salsa de yogur",
      "type": "CENA",
      "status": "ACTIVA",
      "tags": [
        "ENSALADA",
        "PASTA",
        "POLLO",
        "HUEVO",
        "SALSA_YOGUR",
        "CENA"
      ],
      "notes": "Receta recuperada. Sin mozzarella y sin aceite añadido. Pasta pesada en seco y pollo pesado ya cocinado. La cantidad de verduras corresponde al total combinado de lechuga, tomate, pepino y cebolla. La salsa de yogur es nuestro yogur griego ligero con especias.",
      "image": null,
      "image_status": "PENDIENTE",
      "summary": {
        "P01": {
          "kcal": 567.1,
          "protein": 54.24249999999999,
          "carbs": 58.9325,
          "fat": 11.735,
          "p_pct": 0.3886157455916463,
          "c_pct": 0.42221684891145683,
          "f_pct": 0.18916740549689692,
          "goal_pct": 0.29082051282051286
        },
        "P02": {
          "kcal": 451.70000000000005,
          "protein": 43.16,
          "carbs": 44.965,
          "fat": 10.235000000000001,
          "p_pct": 0.38829099333130906,
          "c_pct": 0.4045297617039461,
          "f_pct": 0.2071792449647448,
          "goal_pct": 0.3226428571428572
        }
      },
      "portions": {
        "P01": [
          {
            "food_id": "A051",
            "food": "Pasta de hélices seca",
            "grams": 60.0,
            "note": "pesar en seco",
            "state": "seco"
          },
          {
            "food_id": "A001",
            "food": "Pechuga de pollo cocinada",
            "grams": 110.0,
            "note": "peso ya cocinado",
            "state": "cocinado"
          },
          {
            "food_id": "A016",
            "food": "Huevo cocido",
            "grams": 60.0,
            "note": "1 unidad",
            "state": "cocido"
          },
          {
            "food_id": "A030",
            "food": "Lechuga",
            "grams": 62.5,
            "note": "parte de la mezcla de verduras",
            "state": "crudo"
          },
          {
            "food_id": "A029",
            "food": "Tomate",
            "grams": 62.5,
            "note": "parte de la mezcla de verduras",
            "state": "crudo"
          },
          {
            "food_id": "A052",
            "food": "Pepino",
            "grams": 62.5,
            "note": "parte de la mezcla de verduras",
            "state": "crudo"
          },
          {
            "food_id": "A004",
            "food": "Cebolla",
            "grams": 62.5,
            "note": "parte de la mezcla de verduras",
            "state": "crudo"
          },
          {
            "food_id": "A007",
            "food": "Yogur griego ligero natural Hacendado",
            "grams": 60.0,
            "note": "salsa de yogur con especias",
            "state": "producto"
          }
        ],
        "P02": [
          {
            "food_id": "A051",
            "food": "Pasta de hélices seca",
            "grams": 45.0,
            "note": "pesar en seco",
            "state": "seco"
          },
          {
            "food_id": "A001",
            "food": "Pechuga de pollo cocinada",
            "grams": 85.0,
            "note": "peso ya cocinado",
            "state": "cocinado"
          },
          {
            "food_id": "A016",
            "food": "Huevo cocido",
            "grams": 60.0,
            "note": "1 unidad",
            "state": "cocido"
          },
          {
            "food_id": "A030",
            "food": "Lechuga",
            "grams": 50.0,
            "note": "parte de la mezcla de verduras",
            "state": "crudo"
          },
          {
            "food_id": "A029",
            "food": "Tomate",
            "grams": 50.0,
            "note": "parte de la mezcla de verduras",
            "state": "crudo"
          },
          {
            "food_id": "A052",
            "food": "Pepino",
            "grams": 50.0,
            "note": "parte de la mezcla de verduras",
            "state": "crudo"
          },
          {
            "food_id": "A004",
            "food": "Cebolla",
            "grams": 50.0,
            "note": "parte de la mezcla de verduras",
            "state": "crudo"
          },
          {
            "food_id": "A007",
            "food": "Yogur griego ligero natural Hacendado",
            "grams": 45.0,
            "note": "salsa de yogur con especias",
            "state": "producto"
          }
        ]
      }
    },
    "R027": {
      "id": "R027",
      "mix_mode": "joint",
      "code": "REC-027",
      "version": "1.0",
      "name": "Merluza con tallarines, verduras y salsa de soja",
      "type": "COMIDA",
      "status": "ACTIVA",
      "tags": [
        "MERLUZA",
        "TALLARINES",
        "VERDURAS",
        "SALSA_SOJA",
        "COMIDA"
      ],
      "notes": "Cocer los tallarines aparte. Saltear cebolla, pimiento y calabacín con el AOVE medido. Añadir la merluza en dados o trozos y, al final, incorporar los tallarines y la salsa de soja. Condimentar con ajo en polvo, pimienta y limón. No añadir sal extra.",
      "image": null,
      "image_status": "PENDIENTE",
      "summary": {
        "P01": {
          "kcal": 577.5,
          "protein": 51.12499999999999,
          "carbs": 72.075,
          "fat": 8.96,
          "p_pct": 0.35661969866071425,
          "c_pct": 0.5027553013392858,
          "f_pct": 0.14062500000000003,
          "goal_pct": 0.29615384615384616
        },
        "P02": {
          "kcal": 435.5400000000001,
          "protein": 38.361999999999995,
          "carbs": 54.072,
          "fat": 6.971,
          "p_pct": 0.35481357303890393,
          "c_pct": 0.5001167697554771,
          "f_pct": 0.14506965720561882,
          "goal_pct": 0.31110000000000004
        }
      },
      "portions": {
        "P01": [
          {
            "food_id": "A047",
            "food": "Lomos de merluza",
            "grams": 200.0,
            "note": "",
            "state": "crudo"
          },
          {
            "food_id": "A031",
            "food": "Tallarines secos",
            "grams": 80.0,
            "note": "pesar en seco",
            "state": "seco"
          },
          {
            "food_id": "A038",
            "food": "Calabacín",
            "grams": 120.0,
            "note": "",
            "state": "crudo"
          },
          {
            "food_id": "A035",
            "food": "Pimiento",
            "grams": 80.0,
            "note": "",
            "state": "crudo"
          },
          {
            "food_id": "A004",
            "food": "Cebolla",
            "grams": 60.0,
            "note": "",
            "state": "crudo"
          },
          {
            "food_id": "A049",
            "food": "Salsa de soja Hacendado",
            "grams": 25.0,
            "note": "añadir al final; no añadir sal",
            "state": "producto"
          },
          {
            "food_id": "A006",
            "food": "Aceite de oliva virgen extra",
            "grams": 5.0,
            "note": "para saltear las verduras",
            "state": "producto"
          }
        ],
        "P02": [
          {
            "food_id": "A047",
            "food": "Lomos de merluza",
            "grams": 150.0,
            "note": "",
            "state": "crudo"
          },
          {
            "food_id": "A031",
            "food": "Tallarines secos",
            "grams": 60.0,
            "note": "pesar en seco",
            "state": "seco"
          },
          {
            "food_id": "A038",
            "food": "Calabacín",
            "grams": 90.0,
            "note": "",
            "state": "crudo"
          },
          {
            "food_id": "A035",
            "food": "Pimiento",
            "grams": 60.0,
            "note": "",
            "state": "crudo"
          },
          {
            "food_id": "A004",
            "food": "Cebolla",
            "grams": 45.0,
            "note": "",
            "state": "crudo"
          },
          {
            "food_id": "A049",
            "food": "Salsa de soja Hacendado",
            "grams": 19.0,
            "note": "añadir al final; no añadir sal",
            "state": "producto"
          },
          {
            "food_id": "A006",
            "food": "Aceite de oliva virgen extra",
            "grams": 4.0,
            "note": "para saltear las verduras",
            "state": "producto"
          }
        ]
      }
    },
    "R028": {
      "id": "R028",
      "mix_mode": "joint",
      "code": "REC-028",
      "version": "1.0",
      "name": "Salmón con arroz, verduras y salsa de soja",
      "type": "COMIDA",
      "status": "ACTIVA",
      "tags": [
        "SALMON",
        "ARROZ",
        "VERDURAS",
        "SALSA_SOJA",
        "COMIDA"
      ],
      "notes": "Versión de REC-016 sustituyendo los tallarines por arroz ultracongelado Hacendado. Persona 1 usa 1 bolsita completa de 167 g; Persona 2 125 g. Preparar el arroz según el envase. Cocinar el salmón y las verduras, mezclar con el arroz y añadir la salsa de soja al final. No añadir aceite ni sal extra.",
      "image": null,
      "image_status": "PENDIENTE",
      "summary": {
        "P01": {
          "kcal": 583.3199999999999,
          "protein": 35.233999999999995,
          "carbs": 61.23499999999999,
          "fat": 22.061,
          "p_pct": 0.2411532703084228,
          "c_pct": 0.41911280318261535,
          "f_pct": 0.33973392650896184,
          "goal_pct": 0.2991384615384615
        },
        "P02": {
          "kcal": 443.07200000000006,
          "protein": 26.9516,
          "carbs": 45.884600000000006,
          "fat": 16.9468,
          "p_pct": 0.24288050898244065,
          "c_pct": 0.41349956968995155,
          "f_pct": 0.3436199213276079,
          "goal_pct": 0.31648000000000004
        }
      },
      "portions": {
        "P01": [
          {
            "food_id": "A017",
            "food": "Salmón en lomos",
            "grams": 130.0,
            "note": "",
            "state": "crudo"
          },
          {
            "food_id": "A048",
            "food": "Arroz ultracongelado Hacendado",
            "grams": 167.0,
            "note": "peso preparado; Persona 1 = 1 bolsita de 167 g",
            "state": "cocido"
          },
          {
            "food_id": "A035",
            "food": "Pimiento",
            "grams": 80.0,
            "note": "",
            "state": "crudo"
          },
          {
            "food_id": "A038",
            "food": "Calabacín",
            "grams": 120.0,
            "note": "",
            "state": "crudo"
          },
          {
            "food_id": "A004",
            "food": "Cebolla",
            "grams": 60.0,
            "note": "",
            "state": "crudo"
          },
          {
            "food_id": "A049",
            "food": "Salsa de soja Hacendado",
            "grams": 25.0,
            "note": "añadir al final; no añadir sal",
            "state": "producto"
          }
        ],
        "P02": [
          {
            "food_id": "A017",
            "food": "Salmón en lomos",
            "grams": 100.0,
            "note": "",
            "state": "crudo"
          },
          {
            "food_id": "A048",
            "food": "Arroz ultracongelado Hacendado",
            "grams": 125.0,
            "note": "aprox. 3/4 de bolsita",
            "state": "cocido"
          },
          {
            "food_id": "A035",
            "food": "Pimiento",
            "grams": 60.0,
            "note": "",
            "state": "crudo"
          },
          {
            "food_id": "A038",
            "food": "Calabacín",
            "grams": 90.0,
            "note": "",
            "state": "crudo"
          },
          {
            "food_id": "A004",
            "food": "Cebolla",
            "grams": 45.0,
            "note": "",
            "state": "crudo"
          },
          {
            "food_id": "A049",
            "food": "Salsa de soja Hacendado",
            "grams": 19.2,
            "note": "añadir al final; no añadir sal",
            "state": "producto"
          }
        ]
      }
    },
    "R029": {
      "id": "R029",
      "code": "REC-029",
      "version": "1.0",
      "name": "Tostada de pollo, tomate y mozzarella",
      "type": "DESAYUNO",
      "types": [
        "DESAYUNO",
        "CENA"
      ],
      "status": "ACTIVA",
      "tags": [
        "TOSTADA",
        "POLLO",
        "TOMATE",
        "MOZZARELLA",
        "SIN_ACEITE"
      ],
      "notes": "Tostar ligeramente el pan. Poner el tomate natural rallado bien escurrido, añadir el pollo desmenuzado y la mozzarella y gratinar. 0 g de aceite añadido / NO AÑADIR ACEITE. Ración original de Persona 1: 80 g pan, 100 g tomate, 75 g pollo cocinado y 10 g mozzarella.",
      "image": null,
      "image_status": "PENDIENTE",
      "summary": {
        "P01": {
          "kcal": 388.71666666666664,
          "protein": 33.05,
          "carbs": 48.15,
          "fat": 6.200000000000001,
          "p_pct": 0.34734629532317396,
          "c_pct": 0.5060430898581187,
          "f_pct": 0.14661061481870735,
          "goal_pct": 0.19934188034188033
        },
        "P02": {
          "kcal": 290.89,
          "protein": 24.505,
          "carbs": 36.125,
          "fat": 4.71,
          "p_pct": 0.34403846828823137,
          "c_pct": 0.5071777052402514,
          "f_pct": 0.14878382647151733,
          "goal_pct": 0.20777857142857142
        }
      },
      "portions": {
        "P01": [
          {
            "food_id": "A027",
            "food": "Pan baguette",
            "grams": 80.0,
            "note": "",
            "state": "producto"
          },
          {
            "food_id": "A029",
            "food": "Tomate natural rallado",
            "grams": 100.0,
            "note": "bien escurrido",
            "state": "crudo"
          },
          {
            "food_id": "A001",
            "food": "Pechuga de pollo cocinada",
            "grams": 75.0,
            "note": "peso ya cocinado",
            "state": "cocinado"
          },
          {
            "food_id": "A053",
            "food": "Mozzarella rallada",
            "grams": 10.0,
            "note": "",
            "state": "producto"
          }
        ],
        "P02": [
          {
            "food_id": "A027",
            "food": "Pan baguette",
            "grams": 60.0,
            "note": "",
            "state": "producto"
          },
          {
            "food_id": "A029",
            "food": "Tomate natural rallado",
            "grams": 75.0,
            "note": "bien escurrido",
            "state": "crudo"
          },
          {
            "food_id": "A001",
            "food": "Pechuga de pollo cocinada",
            "grams": 55.0,
            "note": "peso ya cocinado",
            "state": "cocinado"
          },
          {
            "food_id": "A053",
            "food": "Mozzarella rallada",
            "grams": 8.0,
            "note": "",
            "state": "producto"
          }
        ]
      }
    },
    "R030": {
      "id": "R030",
      "mix_mode": "joint",
      "code": "REC-030",
      "version": "1.1",
      "name": "Albóndigas de pollo en salsa de tomate y pimientos con patata",
      "type": "COMIDA",
      "status": "ACTIVA",
      "tags": [
        "ALBONDIGAS",
        "POLLO",
        "TOMATE",
        "PIMIENTOS",
        "PATATA",
        "COMIDA_COMPARTIDA"
      ],
      "notes": "Preparación conjunta Persona 1+Persona 2: picar 350 g de pechuga de pollo cruda y formar las albóndigas. Cocinar las albóndigas en air fryer durante 15 minutos a 190 °C. Preparar la salsa con 100 g de cebolla, 70 g de pimiento verde, 70 g de pimiento rojo, 200 g de salsa de tomate datterino con albahaca, 100 ml de caldo de pollo Hacendado y 5 g de AOVE. Triturar la salsa y terminar de cocinar las albóndigas dentro. Patata al microondas: Persona 1 400 g + 3 g AOVE spray; Persona 2 300 g + 2 g AOVE spray. Una vez cocinadas albóndigas+salsa, pesar el conjunto y repartir aproximadamente 57 % para Persona 1 y 43 % para Persona 2.",
      "image": null,
      "image_status": "PENDIENTE",
      "summary": {
        "P01": {
          "kcal": 668.279,
          "protein": 56.9516,
          "carbs": 84.42739999999999,
          "fat": 9.8125,
          "p_pct": 0.3484191955535741,
          "c_pct": 0.5165109810906071,
          "f_pct": 0.13506982335581885,
          "goal_pct": 0.33949179487179487
        },
        "P02": {
          "kcal": 500.42100000000005,
          "protein": 42.928399999999996,
          "carbs": 63.3926,
          "fat": 7.1375,
          "p_pct": 0.3507784642758285,
          "c_pct": 0.5179964516369557,
          "f_pct": 0.13122508408721578,
          "goal_pct": 0.354065
        }
      },
      "portions": {
        "P01": [
          {
            "food_id": "A001",
            "food": "Pechuga de pollo cruda picada",
            "grams": 199.5,
            "note": "57 % del lote de albóndigas",
            "state": "crudo"
          },
          {
            "food_id": "A004",
            "food": "Cebolla",
            "grams": 57.0,
            "note": "57 % de la salsa",
            "state": "crudo"
          },
          {
            "food_id": "A055",
            "food": "Pimiento verde",
            "grams": 39.9,
            "note": "57 % de la salsa",
            "state": "crudo"
          },
          {
            "food_id": "A056",
            "food": "Pimiento rojo",
            "grams": 39.9,
            "note": "57 % de la salsa",
            "state": "crudo"
          },
          {
            "food_id": "A054",
            "food": "Salsa de tomate datterino con albahaca",
            "grams": 114.0,
            "note": "57 % de la salsa",
            "state": "producto"
          },
          {
            "food_id": "A006",
            "food": "AOVE total",
            "grams": 5.85,
            "note": "2,85 g salsa + 3 g spray patata",
            "state": "producto"
          },
          {
            "food_id": "A002",
            "food": "Patata",
            "grams": 400.0,
            "note": "peso crudo; microondas",
            "state": "crudo"
          },
          {
            "food_id": "A058",
            "food": "Caldo de pollo Hacendado",
            "grams": 57.0,
            "note": "parte proporcional de los 100 ml del lote",
            "state": "producto"
          }
        ],
        "P02": [
          {
            "food_id": "A001",
            "food": "Pechuga de pollo cruda picada",
            "grams": 150.5,
            "note": "43 % del lote de albóndigas",
            "state": "crudo"
          },
          {
            "food_id": "A004",
            "food": "Cebolla",
            "grams": 43.0,
            "note": "43 % de la salsa",
            "state": "crudo"
          },
          {
            "food_id": "A055",
            "food": "Pimiento verde",
            "grams": 30.1,
            "note": "43 % de la salsa",
            "state": "crudo"
          },
          {
            "food_id": "A056",
            "food": "Pimiento rojo",
            "grams": 30.1,
            "note": "43 % de la salsa",
            "state": "crudo"
          },
          {
            "food_id": "A054",
            "food": "Salsa de tomate datterino con albahaca",
            "grams": 86.0,
            "note": "43 % de la salsa",
            "state": "producto"
          },
          {
            "food_id": "A006",
            "food": "AOVE total",
            "grams": 4.15,
            "note": "2,15 g salsa + 2 g spray patata",
            "state": "producto"
          },
          {
            "food_id": "A002",
            "food": "Patata",
            "grams": 300.0,
            "note": "peso crudo; microondas",
            "state": "crudo"
          },
          {
            "food_id": "A058",
            "food": "Caldo de pollo Hacendado",
            "grams": 43.0,
            "note": "parte proporcional de los 100 ml del lote",
            "state": "producto"
          }
        ]
      }
    },
    "R031": {
      "id": "R031",
      "mix_mode": "joint",
      "code": "REC-031",
      "version": "1.0",
      "name": "Ensalada de ñoquis crujientes, pollo, huevo y salsa de yogur",
      "type": "COMIDA",
      "types": [
        "COMIDA",
        "CENA"
      ],
      "status": "ACTIVA",
      "tags": [
        "ENSALADA",
        "ÑOQUIS",
        "POLLO",
        "HUEVO",
        "SALSA_YOGUR",
        "AIRFRYER"
      ],
      "notes": "Preparar los ñoquis en air fryer a 180 °C durante unos 5–8 min, moviéndolos a mitad. 0 g de aceite añadido. Mezclar con pollo cocinado, huevo cocido, lechuga, tomate, pepino y cebolla, y terminar con nuestra salsa de yogur.",
      "image": null,
      "image_status": "PENDIENTE",
      "summary": {
        "P01": {
          "kcal": 568.0,
          "protein": 52.067499999999995,
          "carbs": 62.732499999999995,
          "fat": 11.334999999999999,
          "p_pct": 0.3711055477847171,
          "c_pct": 0.44711919674278133,
          "f_pct": 0.18177525547250162,
          "goal_pct": 0.29128205128205126
        },
        "P02": {
          "kcal": 454.55000000000007,
          "protein": 41.584999999999994,
          "carbs": 48.285000000000004,
          "fat": 9.940000000000001,
          "p_pct": 0.37051721833652596,
          "c_pct": 0.4302133915445271,
          "f_pct": 0.19926939011894684,
          "goal_pct": 0.3246785714285715
        }
      },
      "portions": {
        "P01": [
          {
            "food_id": "A057",
            "food": "Ñoquis de patata Hacendado",
            "grams": 125.0,
            "note": "air fryer 180 °C, 5–8 min",
            "state": "producto"
          },
          {
            "food_id": "A001",
            "food": "Pechuga de pollo cocinada",
            "grams": 110.0,
            "note": "peso ya cocinado",
            "state": "cocinado"
          },
          {
            "food_id": "A016",
            "food": "Huevo cocido",
            "grams": 60.0,
            "note": "1 unidad",
            "state": "cocido"
          },
          {
            "food_id": "A030",
            "food": "Lechuga",
            "grams": 62.5,
            "note": "",
            "state": "crudo"
          },
          {
            "food_id": "A029",
            "food": "Tomate",
            "grams": 62.5,
            "note": "",
            "state": "crudo"
          },
          {
            "food_id": "A052",
            "food": "Pepino",
            "grams": 62.5,
            "note": "",
            "state": "crudo"
          },
          {
            "food_id": "A004",
            "food": "Cebolla",
            "grams": 62.5,
            "note": "",
            "state": "crudo"
          },
          {
            "food_id": "A007",
            "food": "Yogur griego ligero natural Hacendado",
            "grams": 60.0,
            "note": "salsa de yogur",
            "state": "producto"
          }
        ],
        "P02": [
          {
            "food_id": "A057",
            "food": "Ñoquis de patata Hacendado",
            "grams": 95.0,
            "note": "air fryer 180 °C, 5–8 min",
            "state": "producto"
          },
          {
            "food_id": "A001",
            "food": "Pechuga de pollo cocinada",
            "grams": 85.0,
            "note": "peso ya cocinado",
            "state": "cocinado"
          },
          {
            "food_id": "A016",
            "food": "Huevo cocido",
            "grams": 60.0,
            "note": "1 unidad",
            "state": "cocido"
          },
          {
            "food_id": "A030",
            "food": "Lechuga",
            "grams": 50.0,
            "note": "",
            "state": "crudo"
          },
          {
            "food_id": "A029",
            "food": "Tomate",
            "grams": 50.0,
            "note": "",
            "state": "crudo"
          },
          {
            "food_id": "A052",
            "food": "Pepino",
            "grams": 50.0,
            "note": "",
            "state": "crudo"
          },
          {
            "food_id": "A004",
            "food": "Cebolla",
            "grams": 50.0,
            "note": "",
            "state": "crudo"
          },
          {
            "food_id": "A007",
            "food": "Yogur griego ligero natural Hacendado",
            "grams": 45.0,
            "note": "salsa de yogur",
            "state": "producto"
          }
        ]
      }
    },
    "R034": {
      "id": "R034",
      "code": "REC-034",
      "version": "1.1",
      "name": "Hamburguesa crujiente de pollo con Havarti y salsa de yogur",
      "type": "CENA",
      "status": "ACTIVA",
      "tags": [
        "HAMBURGUESA",
        "POLLO",
        "CRUJIENTE",
        "HAVARTI",
        "SALSA_YOGUR",
        "AIRFRYER",
        "MERCADONA"
      ],
      "notes": "Sin huevo y 0 g de aceite añadido / NO AÑADIR ACEITE. Picar o triturar la pechuga, formar la hamburguesa, cubrir con el preparado crujiente y cocinar en air fryer. Montar con cebolla, 1 loncha de Havarti light y 30 g de nuestra salsa de yogur.",
      "image": null,
      "image_status": "PENDIENTE",
      "summary": {
        "P01": {
          "kcal": 469.02,
          "protein": 45.322,
          "carbs": 42.601,
          "fat": 11.681000000000001,
          "p_pct": 0.3968469050240685,
          "c_pct": 0.3730213803656136,
          "f_pct": 0.2301317146103178,
          "goal_pct": 0.24052307692307692
        },
        "P02": {
          "kcal": 469.02,
          "protein": 45.322,
          "carbs": 42.601,
          "fat": 11.681000000000001,
          "p_pct": 0.3968469050240685,
          "c_pct": 0.3730213803656136,
          "f_pct": 0.2301317146103178,
          "goal_pct": 0.3350142857142857
        }
      },
      "portions": {
        "P01": [
          {
            "food_id": "A060",
            "food": "Pan de cristal redondo 100% natural",
            "grams": 60.0,
            "note": "1 unidad",
            "state": "producto"
          },
          {
            "food_id": "A001",
            "food": "Pechuga de pollo",
            "grams": 100.0,
            "note": "picar y formar la hamburguesa",
            "state": "crudo"
          },
          {
            "food_id": "A061",
            "food": "Preparado crujiente Hacendado",
            "grams": 15.0,
            "note": "para el rebozado",
            "state": "producto"
          },
          {
            "food_id": "A004",
            "food": "Cebolla",
            "grams": 30.0,
            "note": "",
            "state": "crudo"
          },
          {
            "food_id": "A063",
            "food": "Salsa de yogur casera",
            "grams": 30.0,
            "note": "usar la salsa reutilizable ya preparada",
            "state": "preparado"
          },
          {
            "food_id": "A013",
            "food": "Queso Havarti light",
            "grams": 25.0,
            "note": "1 loncha",
            "state": "producto"
          }
        ],
        "P02": [
          {
            "food_id": "A060",
            "food": "Pan de cristal redondo 100% natural",
            "grams": 60.0,
            "note": "1 unidad",
            "state": "producto"
          },
          {
            "food_id": "A001",
            "food": "Pechuga de pollo",
            "grams": 100.0,
            "note": "picar y formar la hamburguesa",
            "state": "crudo"
          },
          {
            "food_id": "A061",
            "food": "Preparado crujiente Hacendado",
            "grams": 15.0,
            "note": "para el rebozado",
            "state": "producto"
          },
          {
            "food_id": "A004",
            "food": "Cebolla",
            "grams": 30.0,
            "note": "",
            "state": "crudo"
          },
          {
            "food_id": "A063",
            "food": "Salsa de yogur casera",
            "grams": 30.0,
            "note": "usar la salsa reutilizable ya preparada",
            "state": "preparado"
          },
          {
            "food_id": "A013",
            "food": "Queso Havarti light",
            "grams": 25.0,
            "note": "1 loncha",
            "state": "producto"
          }
        ]
      },
      "calculation_mode": "INGREDIENT_SUM"
    },
    "R035": {
      "id": "R035",
      "mix_mode": "joint",
      "code": "REC-035",
      "version": "1.0",
      "name": "Solomillo de pavo con arroz y pisto",
      "type": "COMIDA",
      "status": "ACTIVA",
      "tags": [
        "PAVO",
        "ARROZ",
        "PISTO",
        "COMIDA",
        "COCINA_COMPARTIDA",
        "MERCADONA",
        "SIN_ACEITE"
      ],
      "notes": "0 g de aceite añadido / NO AÑADIR ACEITE. Persona 1: 180 g de solomillo de pavo, 167 g de arroz ultracongelado Hacendado (1 bolsita) y 150 g de pisto/fritada Hacendado. Persona 2: 140 g de solomillo de pavo, 125 g de arroz ultracongelado Hacendado y 120 g de pisto/fritada Hacendado.",
      "image": null,
      "image_status": "PENDIENTE",
      "summary": {
        "P01": {
          "kcal": 519.0,
          "protein": 46.0,
          "carbs": 62.0,
          "fat": 9.8,
          "p_pct": 0.3602,
          "c_pct": 0.4855,
          "f_pct": 0.1543,
          "goal_pct": 0.26615384615384613
        },
        "P02": {
          "kcal": 401.0,
          "protein": 35.5,
          "carbs": 47.5,
          "fat": 7.7,
          "p_pct": 0.36,
          "c_pct": 0.4817,
          "f_pct": 0.1583,
          "goal_pct": 0.2864285714285714
        }
      },
      "portions": {
        "P01": [
          {
            "food_id": "A064",
            "food": "Solomillo de pavo",
            "grams": 180.0,
            "note": "",
            "state": "crudo"
          },
          {
            "food_id": "A048",
            "food": "Arroz ultracongelado Hacendado",
            "grams": 167.0,
            "note": "1 bolsita",
            "state": "cocido"
          },
          {
            "food_id": "A020",
            "food": "Fritada pisto Hacendado",
            "grams": 150.0,
            "note": "",
            "state": "producto"
          }
        ],
        "P02": [
          {
            "food_id": "A064",
            "food": "Solomillo de pavo",
            "grams": 140.0,
            "note": "",
            "state": "crudo"
          },
          {
            "food_id": "A048",
            "food": "Arroz ultracongelado Hacendado",
            "grams": 125.0,
            "note": "",
            "state": "cocido"
          },
          {
            "food_id": "A020",
            "food": "Fritada pisto Hacendado",
            "grams": 120.0,
            "note": "",
            "state": "producto"
          }
        ]
      }
    },
    "R036": {
      "id": "R036",
      "mix_mode": "joint",
      "code": "REC-036",
      "version": "1.0",
      "name": "Merluza con arroz y salsa de tomate",
      "type": "COMIDA",
      "status": "ACTIVA",
      "tags": [
        "MERLUZA",
        "ARROZ",
        "SALSA_TOMATE",
        "PIMIENTOS",
        "COMIDA",
        "COCINA_COMPARTIDA"
      ],
      "notes": "Preparación conjunta de la salsa: 100 g de cebolla, 70 g de pimiento verde, 70 g de pimiento rojo, 200 g de salsa de tomate datterino con albahaca Hacendado, 100 ml de caldo de pollo Hacendado y 5 g de AOVE. Triturar la salsa y cocinar en ella los lomos de merluza durante unos 5–7 min a fuego medio-bajo. Persona 1: 200 g de merluza + 167 g de arroz ultracongelado Hacendado (1 bolsita) + aproximadamente 55 % de la salsa. Persona 2: 150 g de merluza + 125 g de arroz + aproximadamente 45 % de la salsa. Sin aceite adicional aparte de los 5 g usados en la salsa.",
      "image": null,
      "image_status": "PENDIENTE",
      "summary": {
        "P01": {
          "kcal": 482.255,
          "protein": 43.2755,
          "carbs": 62.611,
          "fat": 6.3785,
          "p_pct": 0.359914960417089,
          "c_pct": 0.5207250196225199,
          "f_pct": 0.11936001996039111,
          "goal_pct": 0.2473102564102564
        },
        "P02": {
          "kcal": 368.865,
          "protein": 32.6385,
          "carbs": 47.969,
          "fat": 5.0475,
          "p_pct": 0.35490373310317175,
          "c_pct": 0.521604153782375,
          "f_pct": 0.12349211311445327,
          "goal_pct": 0.263475
        }
      },
      "portions": {
        "P01": [
          {
            "food_id": "A047",
            "food": "Lomos de merluza",
            "grams": 200.0,
            "note": "",
            "state": "crudo"
          },
          {
            "food_id": "A048",
            "food": "Arroz ultracongelado Hacendado",
            "grams": 167.0,
            "note": "1 bolsita",
            "state": "cocido"
          },
          {
            "food_id": "A004",
            "food": "Cebolla",
            "grams": 55.0,
            "note": "55 % de la salsa",
            "state": "crudo"
          },
          {
            "food_id": "A055",
            "food": "Pimiento verde",
            "grams": 38.5,
            "note": "55 % de la salsa",
            "state": "crudo"
          },
          {
            "food_id": "A056",
            "food": "Pimiento rojo",
            "grams": 38.5,
            "note": "55 % de la salsa",
            "state": "crudo"
          },
          {
            "food_id": "A054",
            "food": "Salsa de tomate datterino con albahaca",
            "grams": 110.0,
            "note": "55 % de la salsa",
            "state": "producto"
          },
          {
            "food_id": "A058",
            "food": "Caldo de pollo Hacendado",
            "grams": 55.0,
            "note": "55 % de los 100 ml del lote",
            "state": "producto"
          },
          {
            "food_id": "A006",
            "food": "Aceite de oliva virgen extra",
            "grams": 2.75,
            "note": "55 % de los 5 g del lote; no añadir más aceite",
            "state": "producto"
          }
        ],
        "P02": [
          {
            "food_id": "A047",
            "food": "Lomos de merluza",
            "grams": 150.0,
            "note": "",
            "state": "crudo"
          },
          {
            "food_id": "A048",
            "food": "Arroz ultracongelado Hacendado",
            "grams": 125.0,
            "note": "",
            "state": "cocido"
          },
          {
            "food_id": "A004",
            "food": "Cebolla",
            "grams": 45.0,
            "note": "45 % de la salsa",
            "state": "crudo"
          },
          {
            "food_id": "A055",
            "food": "Pimiento verde",
            "grams": 31.5,
            "note": "45 % de la salsa",
            "state": "crudo"
          },
          {
            "food_id": "A056",
            "food": "Pimiento rojo",
            "grams": 31.5,
            "note": "45 % de la salsa",
            "state": "crudo"
          },
          {
            "food_id": "A054",
            "food": "Salsa de tomate datterino con albahaca",
            "grams": 90.0,
            "note": "45 % de la salsa",
            "state": "producto"
          },
          {
            "food_id": "A058",
            "food": "Caldo de pollo Hacendado",
            "grams": 45.0,
            "note": "45 % de los 100 ml del lote",
            "state": "producto"
          },
          {
            "food_id": "A006",
            "food": "Aceite de oliva virgen extra",
            "grams": 2.25,
            "note": "45 % de los 5 g del lote; no añadir más aceite",
            "state": "producto"
          }
        ]
      }
    },
    "R037": {
      "id": "R037",
      "code": "REC-037",
      "version": "1.0",
      "name": "Pizza de avena con pollo y mozzarella",
      "type": "CENA",
      "status": "ACTIVA",
      "tags": [
        "PIZZA",
        "AVENA",
        "POLLO",
        "MOZZARELLA",
        "CENA",
        "ALTA_PROTEINA",
        "MERCADONA",
        "SIN_ACEITE"
      ],
      "notes": "Pizza individual para Persona 1 y Persona 2. La base es 1 tortilla de avena Hacendado de 60 g y queda BLOQUEADA: no se escala ni se fracciona. Prehornear la tortilla 2–3 min para que quede firme; añadir una capa fina de tomate, el pollo ya cocinado y la mozzarella; hornear/gratinar hasta fundir. 0 g de aceite añadido / NO AÑADIR ACEITE.",
      "image": null,
      "image_status": "PENDIENTE",
      "summary": {
        "P01": {
          "kcal": 460.6,
          "protein": 47.05,
          "carbs": 29.5,
          "fat": 15.25,
          "p_pct": 0.42439959409178035,
          "c_pct": 0.26609538843161573,
          "f_pct": 0.3095050174766039,
          "goal_pct": 0.23620512820512818
        },
        "P02": {
          "kcal": 409.6,
          "protein": 39.725,
          "carbs": 28.9,
          "fat": 13.305,
          "p_pct": 0.4030488655531459,
          "c_pct": 0.29321868381336474,
          "f_pct": 0.30373245063348936,
          "goal_pct": 0.2925714285714286
        }
      },
      "portions": {
        "P01": [
          {
            "food_id": "A021",
            "food": "Tortilla de avena 51% Hacendado",
            "grams": 60.0,
            "note": "1 tortilla completa de 60 g · BASE BLOQUEADA",
            "state": "producto"
          },
          {
            "food_id": "A066",
            "food": "Tomate frito con aceite de oliva",
            "grams": 50.0,
            "note": "capa fina para evitar humedecer la base",
            "state": "producto"
          },
          {
            "food_id": "A001",
            "food": "Pechuga de pollo cocinada",
            "grams": 100.0,
            "note": "peso ya cocinado; repartir sobre la pizza",
            "state": "cocinado"
          },
          {
            "food_id": "A053",
            "food": "Mozzarella rallada",
            "grams": 30.0,
            "note": "",
            "state": "producto"
          }
        ],
        "P02": [
          {
            "food_id": "A021",
            "food": "Tortilla de avena 51% Hacendado",
            "grams": 60.0,
            "note": "1 tortilla completa de 60 g · BASE BLOQUEADA",
            "state": "producto"
          },
          {
            "food_id": "A066",
            "food": "Tomate frito con aceite de oliva",
            "grams": 45.0,
            "note": "capa fina para evitar humedecer la base",
            "state": "producto"
          },
          {
            "food_id": "A001",
            "food": "Pechuga de pollo cocinada",
            "grams": 80.0,
            "note": "peso ya cocinado; repartir sobre la pizza",
            "state": "cocinado"
          },
          {
            "food_id": "A053",
            "food": "Mozzarella rallada",
            "grams": 25.0,
            "note": "",
            "state": "producto"
          }
        ]
      },
      "locked_food_ids": [
        "A021"
      ],
      "hard_locked_food_ids": [
        "A021"
      ],
      "calculation_mode": "INGREDIENT_SUM"
    },
    "R038": {
      "id": "R038",
      "code": "REC-038",
      "version": "1.0",
      "name": "Pizza de avena con jamón cocido y mozzarella",
      "type": "CENA",
      "status": "ACTIVA",
      "tags": [
        "PIZZA",
        "AVENA",
        "JAMON_COCIDO",
        "MOZZARELLA",
        "CENA",
        "ALTA_PROTEINA",
        "MERCADONA",
        "SIN_ACEITE"
      ],
      "notes": "Pizza individual para Persona 1 y Persona 2. La base es 1 tortilla de avena Hacendado de 60 g y queda BLOQUEADA: no se escala ni se fracciona. Prehornear la tortilla 2–3 min para que quede firme; añadir una capa fina de tomate, repartir el jamón sin amontonarlo y terminar con mozzarella; hornear/gratinar hasta fundir. 0 g de aceite añadido / NO AÑADIR ACEITE.",
      "image": null,
      "image_status": "PENDIENTE",
      "summary": {
        "P01": {
          "kcal": 428.2,
          "protein": 40.75,
          "carbs": 30.67,
          "fat": 14.9,
          "p_pct": 0.38829863261708514,
          "c_pct": 0.29224832054885896,
          "f_pct": 0.31945304683405595,
          "goal_pct": 0.21958974358974356
        },
        "P02": {
          "kcal": 379.6,
          "protein": 33.925,
          "carbs": 29.8,
          "fat": 12.925,
          "p_pct": 0.36554650144790896,
          "c_pct": 0.3210990639100276,
          "f_pct": 0.3133544346420635,
          "goal_pct": 0.2711428571428572
        }
      },
      "portions": {
        "P01": [
          {
            "food_id": "A021",
            "food": "Tortilla de avena 51% Hacendado",
            "grams": 60.0,
            "note": "1 tortilla completa de 60 g · BASE BLOQUEADA",
            "state": "producto"
          },
          {
            "food_id": "A066",
            "food": "Tomate frito con aceite de oliva",
            "grams": 50.0,
            "note": "capa fina para evitar humedecer la base",
            "state": "producto"
          },
          {
            "food_id": "A065",
            "food": "Jamón cocido extra 92%",
            "grams": 130.0,
            "note": "repartir bien para no cargar el centro",
            "state": "producto"
          },
          {
            "food_id": "A053",
            "food": "Mozzarella rallada",
            "grams": 30.0,
            "note": "",
            "state": "producto"
          }
        ],
        "P02": [
          {
            "food_id": "A021",
            "food": "Tortilla de avena 51% Hacendado",
            "grams": 60.0,
            "note": "1 tortilla completa de 60 g · BASE BLOQUEADA",
            "state": "producto"
          },
          {
            "food_id": "A066",
            "food": "Tomate frito con aceite de oliva",
            "grams": 45.0,
            "note": "capa fina para evitar humedecer la base",
            "state": "producto"
          },
          {
            "food_id": "A065",
            "food": "Jamón cocido extra 92%",
            "grams": 100.0,
            "note": "repartir bien para no cargar el centro",
            "state": "producto"
          },
          {
            "food_id": "A053",
            "food": "Mozzarella rallada",
            "grams": 25.0,
            "note": "",
            "state": "producto"
          }
        ]
      },
      "locked_food_ids": [
        "A021"
      ],
      "hard_locked_food_ids": [
        "A021"
      ],
      "calculation_mode": "INGREDIENT_SUM"
    }
  },
  "foods": {
    "A001": {
      "name": "Pechuga de pollo",
      "source": "Tabla propia",
      "pack_g": null,
      "pack_unit": null,
      "pack_notes": null,
      "state": "crudo",
      "nutrition_100": {
        "kcal": 165.0,
        "protein": 31.0,
        "carbs": 0.0,
        "fat": 3.6
      }
    },
    "A002": {
      "name": "Patata",
      "source": "Genérico",
      "pack_g": null,
      "pack_unit": null,
      "pack_notes": null,
      "state": "crudo"
    },
    "A003": {
      "name": "Champiñones laminados",
      "source": "Mercadona",
      "pack_g": 450,
      "pack_unit": "bote",
      "pack_notes": "Peso neto 450 g; peso escurrido 250 g",
      "state": "peso escurrido"
    },
    "A004": {
      "name": "Cebolla",
      "source": "Genérico",
      "pack_g": null,
      "pack_unit": null,
      "pack_notes": null,
      "state": "crudo",
      "nutrition_100": {
        "kcal": 40.0,
        "protein": 1.1,
        "carbs": 9.3,
        "fat": 0.1
      }
    },
    "A005": {
      "name": "Leche evaporada parcialmente desnatada",
      "source": "Mercadona",
      "pack_g": 200,
      "pack_unit": "brick",
      "pack_notes": "Envase mostrado de 200 ml aprox.",
      "state": "producto"
    },
    "A006": {
      "name": "Aceite de oliva virgen extra",
      "source": "Mercadona/Genérico",
      "pack_g": null,
      "pack_unit": null,
      "pack_notes": null,
      "state": "producto",
      "nutrition_100": {
        "kcal": 900.0,
        "protein": 0.0,
        "carbs": 0.0,
        "fat": 100.0
      }
    },
    "A007": {
      "name": "Yogur griego natural",
      "source": "Mercadona",
      "pack_g": 125,
      "pack_unit": "vasito",
      "pack_notes": "Vasito individual de 125 g",
      "state": "producto",
      "nutrition_100": {
        "kcal": 60.0,
        "protein": 5.8,
        "carbs": 4.7,
        "fat": 2.0
      }
    },
    "A008": {
      "name": "Plátano",
      "source": "Genérico",
      "pack_g": null,
      "pack_unit": null,
      "pack_notes": null,
      "state": "parte comestible"
    },
    "A009": {
      "name": "Impact Whey Protein MyProtein sin sabor",
      "source": "MyProtein",
      "pack_g": null,
      "pack_unit": null,
      "pack_notes": null,
      "state": "polvo"
    },
    "A010": {
      "name": "Gotas de chocolate para fundir Hacendado",
      "source": "Mercadona",
      "pack_g": null,
      "pack_unit": "bolsa",
      "pack_notes": "501 kcal · 6,0 g proteína · 59 g HC · 25 g grasa por 100 g. Etiqueta aportada.",
      "state": "producto"
    },
    "A011": {
      "name": "Pan de molde Hacendado",
      "source": "Mercadona",
      "pack_g": 450,
      "pack_unit": "paquete",
      "pack_notes": "Etiqueta aportada: 237 kcal, 8,2 g proteína, 42 g HC, 3,1 g grasa por 100 g. Cada rebanada = 28 g.",
      "state": "producto"
    },
    "A012": {
      "name": "Pechuga de pavo en lonchas",
      "source": "Mercadona",
      "pack_g": 200,
      "pack_unit": "paquete",
      "pack_notes": "Paquete 200 g. Aproximadamente 25 g por loncha (6 lonchas ≈150 g).",
      "state": "producto",
      "nutrition_100": {
        "kcal": 89.0,
        "protein": 19.5,
        "carbs": 1.0,
        "fat": 1.3
      }
    },
    "A013": {
      "name": "Queso Havarti light",
      "source": "Mercadona",
      "pack_g": 300,
      "pack_unit": "paquete",
      "pack_notes": "1 loncha ≈25 g",
      "state": "producto",
      "nutrition_100": {
        "kcal": 267.0,
        "protein": 27.0,
        "carbs": 1.6,
        "fat": 17.0
      }
    },
    "A014": {
      "name": "Cebolla caramelizada con aceite de oliva",
      "source": "Mercadona",
      "pack_g": 190,
      "pack_unit": "bote",
      "pack_notes": "Peso neto 190 g",
      "state": "producto"
    },
    "A015": {
      "name": "Mostaza",
      "source": "Mercadona",
      "pack_g": null,
      "pack_unit": null,
      "pack_notes": null,
      "state": "producto"
    },
    "A016": {
      "name": "Huevo entero",
      "source": "Genérico",
      "pack_g": null,
      "pack_unit": null,
      "pack_notes": null,
      "state": "crudo",
      "nutrition_100": {
        "kcal": 130.0,
        "protein": 10.5,
        "carbs": 1.0,
        "fat": 8.8333333333
      }
    },
    "A017": {
      "name": "Salmón en lomos",
      "source": "Mercadona",
      "pack_g": null,
      "pack_unit": "bandeja",
      "pack_notes": "Completar peso neto del envase si interesa para compra",
      "state": "producto"
    },
    "A018": {
      "name": "Arroz ultracongelado",
      "source": "Mercadona",
      "pack_g": 1000,
      "pack_unit": "bolsa",
      "pack_notes": "Bolsa 1 kg (6 x 167 g aprox.)",
      "state": "producto"
    },
    "A019": {
      "name": "Salteado de verduras asadas ultracongeladas",
      "source": "Mercadona",
      "pack_g": 450,
      "pack_unit": "bolsa",
      "pack_notes": "Bolsa 450 g",
      "state": "producto"
    },
    "A020": {
      "name": "Fritada pisto Hacendado",
      "source": "Mercadona",
      "pack_g": 380,
      "pack_unit": "brick",
      "pack_notes": "Brick 380 g",
      "state": "producto"
    },
    "A021": {
      "name": "Tortillas de avena 51% Hacendado",
      "source": "Mercadona",
      "pack_g": 360,
      "pack_unit": "paquete",
      "pack_notes": "Paquete 6 ud. (360 g); 60 g por tortilla",
      "state": "producto",
      "nutrition_100": {
        "kcal": 287.0,
        "protein": 15.0,
        "carbs": 40.0,
        "fat": 6.0
      }
    },
    "A022": {
      "name": "Harina de avena Hacendado",
      "source": "Mercadona",
      "pack_g": null,
      "pack_unit": "paquete",
      "pack_notes": "Completar peso del envase cuando se confirme",
      "state": "producto"
    },
    "A023": {
      "name": "Evolate 2.0 Chocolate",
      "source": "HSN",
      "pack_g": null,
      "pack_unit": "bolsa",
      "pack_notes": "30 g = 1 scoop en la receta original",
      "state": "polvo"
    },
    "A024": {
      "name": "Leche desnatada Covap",
      "source": "Covap",
      "pack_g": null,
      "pack_unit": "brick",
      "pack_notes": "Medida en ml",
      "state": "producto"
    },
    "A025": {
      "name": "Hielo",
      "source": "Genérico",
      "pack_g": null,
      "pack_unit": null,
      "pack_notes": "0 kcal",
      "state": "producto"
    },
    "A026": {
      "name": "Cacao desgrasado en polvo",
      "source": "Mercadona",
      "pack_g": 265,
      "pack_unit": "paquete",
      "pack_notes": "375 kcal · 25,5 g proteína · 16,3 g HC · 16 g grasa · 31,7 g fibra por 100 g",
      "state": "producto"
    },
    "A027": {
      "name": "Pan baguette",
      "source": "Panadería / valor de la pauta",
      "pack_g": null,
      "pack_unit": null,
      "pack_notes": "75 g = 205 kcal según la captura de la pauta",
      "state": "producto"
    },
    "A028": {
      "name": "Pechuga de pavo 92%",
      "source": "Mercadona",
      "pack_g": null,
      "pack_unit": "paquete",
      "pack_notes": "75 g = 67 kcal según la captura de la pauta",
      "state": "producto",
      "nutrition_100": {
        "kcal": 89.0,
        "protein": 19.5,
        "carbs": 1.0,
        "fat": 1.3
      }
    },
    "A029": {
      "name": "Tomate rallado",
      "source": "Genérico",
      "pack_g": null,
      "pack_unit": null,
      "pack_notes": "Tomate natural rallado; 100 g ≈ 18 kcal",
      "state": "crudo",
      "nutrition_100": {
        "kcal": 18.0,
        "protein": 0.9,
        "carbs": 3.9,
        "fat": 0.2
      }
    },
    "A030": {
      "name": "Lechuga",
      "source": "Genérico",
      "pack_g": null,
      "pack_unit": null,
      "pack_notes": "Valores orientativos de lechuga fresca",
      "state": "crudo",
      "nutrition_100": {
        "kcal": 15.0,
        "protein": 1.4,
        "carbs": 2.9,
        "fat": 0.2
      }
    },
    "A031": {
      "name": "Tallarines secos",
      "source": "Mercadona",
      "pack_g": 500,
      "pack_unit": "paquete",
      "pack_notes": "361 kcal · 13 g proteína · 72 g HC · 1,5 g grasa por 100 g. Valores de la etiqueta aportada.",
      "state": "seco"
    },
    "A032": {
      "name": "Pimienta negra",
      "source": "Genérico",
      "pack_g": null,
      "pack_unit": null,
      "pack_notes": "Cantidad culinaria; aporte energético despreciable.",
      "state": "producto"
    },
    "A033": {
      "name": "Ajo en polvo",
      "source": "Genérico",
      "pack_g": null,
      "pack_unit": null,
      "pack_notes": "Cantidad culinaria pequeña.",
      "state": "producto"
    },
    "A034": {
      "name": "Nuez moscada",
      "source": "Genérico",
      "pack_g": null,
      "pack_unit": null,
      "pack_notes": "Opcional; cantidad culinaria pequeña.",
      "state": "producto"
    },
    "A036": {
      "name": "Semillas de chía Hacendado",
      "source": "Mercadona",
      "pack_g": null,
      "pack_unit": "paquete",
      "pack_notes": "Ingrediente del overnight oats.",
      "state": "seco"
    },
    "A037": {
      "name": "Cacahuete desgrasado en polvo",
      "source": "Mercadona / genérico",
      "pack_g": null,
      "pack_unit": "paquete",
      "pack_notes": "Ingrediente del overnight oats.",
      "state": "polvo"
    },
    "A039": {
      "name": "Café",
      "source": "Genérico",
      "pack_g": null,
      "pack_unit": null,
      "pack_notes": "Café solo; aporte energético despreciable. La leche se contabiliza aparte.",
      "state": "bebida"
    },
    "A035": {
      "name": "Pimiento",
      "source": "Genérico",
      "pack_g": null,
      "pack_unit": null,
      "pack_notes": "Verdura habitual para salteados.",
      "state": "crudo"
    },
    "A038": {
      "name": "Calabacín",
      "source": "Genérico",
      "pack_g": null,
      "pack_unit": null,
      "pack_notes": "Verdura habitual para salteados.",
      "state": "crudo"
    },
    "A040": {
      "name": "Tomate frito Hacendado",
      "source": "Mercadona",
      "pack_g": 400,
      "pack_unit": "tarro",
      "pack_notes": "81 kcal · 1,4 g proteína · 11,6 g HC · 3,0 g grasa por 100 g. Etiqueta aportada por el usuario.",
      "state": "producto"
    },
    "A041": {
      "name": "Atún al natural Hacendado",
      "source": "Mercadona / referencia",
      "pack_g": null,
      "pack_unit": "lata",
      "pack_notes": "Referencia provisional: 98 kcal · 21 g proteína · 0,9 g HC · 1,2 g grasa por 100 g escurrido. Sustituir por etiqueta concreta si se aporta.",
      "state": "peso escurrido"
    },
    "A042": {
      "name": "Mermelada de melocotón Hacendado",
      "source": "Mercadona",
      "pack_g": 440,
      "pack_unit": "tarro",
      "pack_notes": "Etiqueta aportada: 194 kcal, 0,5 g proteína, 48 g HC, 0 g grasa por 100 g.",
      "state": "producto"
    },
    "A043": {
      "name": "Melocotón",
      "source": "Genérico",
      "pack_g": null,
      "pack_unit": "pieza",
      "pack_notes": "Valores estándar de fruta fresca; peso comestible.",
      "state": "crudo",
      "nutrition_100": {
        "kcal": 39.0,
        "protein": 0.9,
        "carbs": 9.5,
        "fat": 0.3
      }
    },
    "A044": {
      "name": "Sandía",
      "source": "Genérico",
      "pack_g": null,
      "pack_unit": null,
      "pack_notes": "Valores estándar de fruta fresca; peso comestible.",
      "state": "crudo"
    },
    "A045": {
      "name": "Gelatina neutra en hojas",
      "source": "Genérico",
      "pack_g": null,
      "pack_unit": "hoja",
      "pack_notes": "REC-022 usa 2 hojas. Aporte energético despreciable a efectos prácticos.",
      "state": "producto"
    },
    "A046": {
      "name": "Copos de cereales sin azúcares añadidos Mercadona",
      "source": "Mercadona",
      "pack_g": null,
      "pack_unit": "paquete",
      "pack_notes": "20 g por ración en REC-022. Mantener cantidad fija.",
      "state": "producto"
    },
    "A047": {
      "name": "Lomos de merluza",
      "source": "Genérico",
      "pack_g": null,
      "pack_unit": null,
      "pack_notes": "Referencia Nutriplan: 18 g proteína y 1 g grasa por 100 g.",
      "state": "crudo"
    },
    "A048": {
      "name": "Arroz ultracongelado Hacendado",
      "source": "Mercadona",
      "pack_g": 167,
      "pack_unit": "bolsita",
      "pack_notes": "Paquete 1 kg: 6 bolsitas de aprox. 167 g. Etiqueta aportada: 126 kcal · 2,7 g proteína · 28 g HC · 0,3 g grasa por 100 g.",
      "state": "cocido"
    },
    "A049": {
      "name": "Salsa de soja Hacendado",
      "source": "Mercadona",
      "pack_g": 250,
      "pack_unit": "ml",
      "pack_notes": "Etiqueta aportada: 66 kcal · 7,3 g proteína · 6,3 g HC · <0,5 g grasa · 12,5 g sal por 100 ml.",
      "state": "producto"
    },
    "A050": {
      "name": "Queso fresco batido 0% Hacendado",
      "source": "Mercadona",
      "pack_g": 500,
      "pack_unit": "tarrina",
      "pack_notes": "46 kcal · 8,0 g proteína · 3,5 g HC · <0,5 g grasa por 100 g. Etiqueta aportada.",
      "state": "producto",
      "nutrition_100": {
        "kcal": 46.0,
        "protein": 8.0,
        "carbs": 3.5,
        "fat": 0.3
      }
    },
    "A051": {
      "name": "Pasta de hélices seca",
      "source": "Genérico / Mercadona",
      "pack_g": null,
      "pack_unit": "paquete",
      "pack_notes": "Pesar en seco. Valores de referencia: 361 kcal · 13 g proteína · 72 g HC · 1,5 g grasa por 100 g.",
      "state": "seco"
    },
    "A052": {
      "name": "Pepino",
      "source": "Genérico",
      "pack_g": null,
      "pack_unit": null,
      "pack_notes": "",
      "state": "crudo"
    },
    "A053": {
      "name": "Mozzarella rallada",
      "source": "Lafuente / etiqueta aportada",
      "pack_g": null,
      "pack_unit": "bolsa",
      "pack_notes": "283 kcal · 21 g proteína · 2,5 g HC · 21 g grasa por 100 g.",
      "state": "producto",
      "nutrition_100": {
        "kcal": 283.0,
        "protein": 21.0,
        "carbs": 2.5,
        "fat": 21.0
      }
    },
    "A054": {
      "name": "Salsa de tomate datterino con albahaca",
      "source": "Mercadona",
      "pack_g": null,
      "pack_unit": "tarro",
      "pack_notes": "Etiqueta aportada: 34 kcal · 1,1 g proteína · 5,8 g HC · <0,5 g grasa por 100 g.",
      "state": "producto"
    },
    "A055": {
      "name": "Pimiento verde",
      "source": "Genérico",
      "pack_g": null,
      "pack_unit": null,
      "pack_notes": "Usado en REC-030.",
      "state": "crudo"
    },
    "A056": {
      "name": "Pimiento rojo",
      "source": "Genérico",
      "pack_g": null,
      "pack_unit": null,
      "pack_notes": "Usado en REC-030.",
      "state": "crudo"
    },
    "A057": {
      "name": "Ñoquis de patata Hacendado",
      "source": "Mercadona",
      "pack_g": 500,
      "pack_unit": "paquete",
      "pack_notes": "Etiqueta aportada: 174 kcal · 4,5 g proteína · 37,6 g HC · 0,4 g grasa por 100 g.",
      "state": "producto"
    },
    "A058": {
      "name": "Caldo de pollo Hacendado",
      "source": "Mercadona",
      "pack_g": 1000,
      "pack_unit": "ml",
      "pack_notes": "Etiqueta aportada: 11 kcal · 0,4 g proteína · 0,5 g HC · 0,8 g grasa · 0,75 g sal por 100 ml.",
      "state": "producto"
    },
    "A059": {
      "name": "Pan integral 100% espelta",
      "source": "Mercadona / referencia ya usada en REC-012",
      "pack_g": null,
      "pack_unit": "rebanada",
      "pack_notes": "2 rebanadas = 70 g. Valores nutricionales inferidos de la receta original para conservar sus macros de referencia.",
      "state": "producto",
      "nutrition_100": {
        "kcal": 240.49295774647888,
        "protein": 11.126760563380282,
        "carbs": 35.21126760563381,
        "fat": 4.366197183098592
      }
    },
    "A060": {
      "name": "Pan de cristal redondo 100% natural",
      "source": "Mercadona",
      "pack_g": 240,
      "pack_unit": "paquete",
      "pack_notes": "Paquete de 4 unidades; 60 g por pan. 228,3 kcal · 7,3 g proteína · 43 g HC · 2,3 g grasa por 100 g.",
      "state": "producto",
      "nutrition_100": {
        "kcal": 228.3,
        "protein": 7.3,
        "carbs": 43.0,
        "fat": 2.3
      }
    },
    "A061": {
      "name": "Preparado crujiente Hacendado",
      "source": "Mercadona",
      "pack_g": 400,
      "pack_unit": "paquete",
      "pack_notes": "368 kcal · 8,5 g proteína · 79,9 g HC · 0,9 g grasa por 100 g.",
      "state": "producto",
      "nutrition_100": {
        "kcal": 368.0,
        "protein": 8.5,
        "carbs": 79.9,
        "fat": 0.9
      }
    },
    "A062": {
      "name": "Otra fruta",
      "source": "Genérico / valor orientativo",
      "pack_g": null,
      "pack_unit": "pieza",
      "pack_notes": "Para REC-024: 1 pieza de fruta adicional. Se contabilizan 150 g con un valor medio orientativo; los macros reales dependen de la fruta elegida.",
      "state": "crudo",
      "nutrition_100": {
        "kcal": 50.0,
        "protein": 0.5,
        "carbs": 12.5,
        "fat": 0.2
      }
    },
    "A063": {
      "name": "Salsa de yogur casera",
      "source": "Preparación Nutriplan",
      "pack_g": 137,
      "pack_unit": "lote",
      "pack_notes": "Lote: 120 g yogur griego ligero + 8 g AOVE + 6 g limón + 1 g pimienta + 1 g ajo en polvo + 1 g sal. Cilantro al gusto.",
      "state": "preparado",
      "nutrition_100": {
        "kcal": 110.3,
        "protein": 5.29,
        "carbs": 5.42,
        "fat": 7.62
      }
    },
    "A064": {
      "name": "Solomillo de pavo",
      "source": "Genérico / Nutriplan",
      "pack_g": null,
      "pack_unit": null,
      "pack_notes": "Usado en REC-035. Peso indicado en crudo.",
      "state": "crudo"
    },
    "A065": {
      "name": "Jamón cocido extra 92%",
      "source": "Mercadona / etiqueta aportada",
      "pack_g": 200,
      "pack_unit": "paquete",
      "pack_notes": "102 kcal · 19 g proteína · 0,9 g HC · 2,5 g grasa por 100 g. 92% jamón.",
      "state": "producto",
      "nutrition_100": {
        "kcal": 102.0,
        "protein": 19.0,
        "carbs": 0.9,
        "fat": 2.5
      }
    },
    "A066": {
      "name": "Tomate frito con aceite de oliva",
      "source": "Mercadona / etiqueta aportada",
      "pack_g": 210,
      "pack_unit": "brick",
      "pack_notes": "77 kcal · 1,5 g proteína · 9,5 g HC · 3,5 g grasa por 100 g.",
      "state": "producto",
      "nutrition_100": {
        "kcal": 77.0,
        "protein": 1.5,
        "carbs": 9.5,
        "fat": 3.5
      }
    }
  },
  "version": "4.9 REC-037 y REC-038 pizzas de avena + base 60 g bloqueada"
};
