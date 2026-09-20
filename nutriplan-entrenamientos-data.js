/* Nutriplan · Preparación nutricional para ciclismo
   Objetivo del DÍA ANTERIOR expresado en gramos de hidratos por kg de peso.
   scalingExtraCarbs conserva un escalado progresivo de las raciones para no
   inflarlas bruscamente al cambiar desde la antigua tabla de +g fijos.
*/
window.NUTRIPLAN_TRAINING_DATA = {
  version: "2.0",
  durations: [1.5,2,2.5,3,3.5,4,4.5,5],
  intensity: {
    easy: {label:"Suave / Z2"},
    hard: {label:"Intenso"}
  },
  previousDayCarbGkg: {
    "1.5": {easy:3.0, hard:3.4},
    "2":   {easy:3.3, hard:3.8},
    "2.5": {easy:3.6, hard:4.2},
    "3":   {easy:4.0, hard:4.6},
    "3.5": {easy:4.3, hard:5.0},
    "4":   {easy:4.6, hard:5.3},
    "4.5": {easy:4.8, hard:5.6},
    "5":   {easy:5.0, hard:6.0}
  },
  scalingExtraCarbs: {
    "1.5": {easy:25,  hard:50},
    "2":   {easy:50,  hard:75},
    "2.5": {easy:75,  hard:100},
    "3":   {easy:100, hard:125},
    "3.5": {easy:125, hard:150},
    "4":   {easy:150, hard:175},
    "4.5": {easy:175, hard:200},
    "5":   {easy:200, hard:225}
  }
};
