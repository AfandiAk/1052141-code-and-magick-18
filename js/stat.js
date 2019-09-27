'use strict';

// функция drowStatisticsCloud рисует многоугольник,
// который используется как основание для вывода данных статистики
// в том же стиле, который используется в игре
var drowStatisticsCloud = function (ctx, x, y, width, heigth, offset, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + offset, y + heigth / 2);
  ctx.lineTo(x, y + heigth);
  ctx.lineTo(x + width / 2, y + heigth - offset);
  ctx.lineTo(x + width, y + heigth);
  ctx.lineTo(x + width - offset, y + heigth / 2);
  ctx.lineTo(x + width, y);
  ctx.lineTo(x + width / 2, y + offset);
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.closePath();
  ctx.fill();
};

// выбор цвета столбца гистограммы
// если игрок 'Вы' столбец красный, в противном случае в оттенках синего
// со случайным значением насыщености
var histogramColumnColor = function (name) {
  var histogramColMeColor = 'rgba(255, 0, 0, 1)'; // цвет столбца игрока 'Вы'

  if (name === 'Вы') {
    return histogramColMeColor;
  } else {
    return 'hsl(240,' + (Math.floor(Math.random() * 76) + 10).toString() + '%, 25%)';
  }
};

// максимальное значение времени игроков
var getMaxTimePoints = function (times) {
  var maxTimePoints = 0;

  for (var y = 0; y < times.length; y++) {
    if (maxTimePoints < times[y]) {
      maxTimePoints = times[y];
    }
  }
  return maxTimePoints;
};

// функция вывода заголовка статистики
var printStatisticsHeader = function (ctx, text, color, positionX, positionY) {
  ctx.fillStyle = color;
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText(text, positionX, positionY);
};

// функция renderStatistics выводит данные статистики в виде гистограмы
// результат, имя игрока - затраченное время
window.renderStatistics = function (ctx, names, times) {
  var CLOUD_START_X = 100; // положение по х основания для вывода статистики
  var CLOUD_START_Y = 10; // положение по у основания для вывода статистики
  var CLOUD_WIDTH = 420; // ширина основания для вывода статистики
  var CLOUD_HEGTH = 270; // высота основания для вывода статистики
  var CLOUD_OFFSET = 10; // изгиб сторон многоугольника основания для вывода статистики
  var CLOUD_COLOR = 'rgb(255, 255, 255)'; // цвет основания для вывода статистики
  var TEXT_COLOR = 'rgb(0, 0, 0)'; // цвет текста
  var HISTOGRAM_COLUMN_WIDTH = 40; // ширина столбца гистограммы
  var HISTOGRAM_COLUMN_MAX_HEIGTH = 150; // максимальная высота столбца
  var COLUMN_SPACING = 50; // растояние между столбцами гистограммы
  var histogramColHeigth; // высота текущего столбца гистограммы
  var histogramColStartY = 90; // положение по y самого высокого столбца
  var histogramColCurrentY; // положение по у текущего столбца
  var columnStartPointX = 150; // положение по х текущего столбца
  var maxTimePoints; // максимальное значение из массива times[], показателя времени
  var cloudShadowStartX = CLOUD_START_X + 10; // положение по х тени
  var cloudShadowStartY = CLOUD_START_Y + 10; // положение по у тени
  var cloudShadowColor = 'rgba(0, 0, 0, 0.7)'; // цвет тени
  var headerTextStartX = 220; // заголовок положение по х
  var headerTextStartY = 30; // заголовок положение по у
  var textlineHeigth = 20; // расстояние между строками текста
  var textNamesStartY = 250; // положение по у строки с именами игроков

  drowStatisticsCloud(ctx, cloudShadowStartX, cloudShadowStartY, CLOUD_WIDTH, CLOUD_HEGTH, CLOUD_OFFSET, cloudShadowColor);
  drowStatisticsCloud(ctx, CLOUD_START_X, CLOUD_START_Y, CLOUD_WIDTH, CLOUD_HEGTH, CLOUD_OFFSET, CLOUD_COLOR);

  // вывод заголовка экрана статистики
  printStatisticsHeader(ctx, 'Ура вы победили!', TEXT_COLOR, headerTextStartX, headerTextStartY);
  headerTextStartY = headerTextStartY + textlineHeigth;
  printStatisticsHeader(ctx, 'Список результатов:', TEXT_COLOR, headerTextStartX, headerTextStartY);

  maxTimePoints = getMaxTimePoints(times);

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = TEXT_COLOR;
    ctx.fillText(names[i], columnStartPointX, textNamesStartY);
    ctx.fillStyle = histogramColumnColor(names[i]);

    histogramColHeigth = (times[i] * HISTOGRAM_COLUMN_MAX_HEIGTH) / maxTimePoints;
    histogramColCurrentY = histogramColStartY + (HISTOGRAM_COLUMN_MAX_HEIGTH - histogramColHeigth);
    ctx.fillRect(columnStartPointX, histogramColCurrentY, HISTOGRAM_COLUMN_WIDTH, histogramColHeigth);

    ctx.fillStyle = TEXT_COLOR;
    ctx.fillText(Math.round(times[i]), columnStartPointX, histogramColCurrentY - textlineHeigth);
    columnStartPointX = columnStartPointX + COLUMN_SPACING + HISTOGRAM_COLUMN_WIDTH;
  }
};
