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


// функция renderStatistics выводит данные статистики в виде гистограмы
// результат, имя игрока - затраченное время
window.renderStatistics = function (ctx, names, times) {
  var columnSpacing = 50; // растояние между столбцами гистограммы
  var histogramColWidth = 40; // ширина столбца гистограммы
  var histogramColMaxHeigth = 150; // максимальная высота столбца
  var histogramColHeigth; // высота текущего столбца гистограммы
  var histogramColStartY = 90; // положение по y самого высокого столбца
  var histogramColCurrentY; // положение по у текущего столбца
  var columnStartPointX = 150; // положение по х текущего столбца
  var maxTimePoints; // максимальное значение из массива times[], показателя времени
  var cloudStartX = 100; // положение по х основания для вывода статистики
  var cloudStartY = 10; // положение по у основания для вывода статистики
  var cloudWidth = 420; // ширина основания для вывода статистики
  var cloudHeigth = 270; // высота основания для вывода статистики
  var cloudOffset = 10; // изгиб сторон многоугольника основания для вывода статистики
  var cloudColor = 'rgb(255, 255, 255)'; // цвет основания для вывода статистики
  var cloudShadowStartX = cloudStartX + 10; // положение по х тени
  var cloudShadowStartY = cloudStartY + 10; // положение по у тени
  var cloudShadowColor = 'rgba(0, 0, 0, 0.7)'; // цвет тени
  var textColor = 'rgb(0, 0, 0)'; // цвет текста
  var headerTextStartX = 220; // заголовок положение по х
  var headerTextStartY = 30; // заголовок положение по у
  var textlineHeigth = 20; // расстояние между строками текста
  var textNamesStartY = 250; // положение по у строки с именами игроков


  drowStatisticsCloud(ctx, cloudShadowStartX, cloudShadowStartY, cloudWidth, cloudHeigth, cloudOffset, cloudShadowColor);
  drowStatisticsCloud(ctx, cloudStartX, cloudStartY, cloudWidth, cloudHeigth, cloudOffset, cloudColor);

  // вывод заголовка экрана статистики
  ctx.fillStyle = textColor;
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', headerTextStartX, headerTextStartY);
  headerTextStartY = headerTextStartY + textlineHeigth;
  ctx.fillText('Список результатов:', headerTextStartX, headerTextStartY);


  maxTimePoints = getMaxTimePoints(times);

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = textColor;
    ctx.fillText(names[i], columnStartPointX, textNamesStartY);

    ctx.fillStyle = histogramColumnColor(names[i]);

    histogramColHeigth = (times[i] * histogramColMaxHeigth) / maxTimePoints;
    histogramColCurrentY = histogramColStartY + (histogramColMaxHeigth - histogramColHeigth);
    ctx.fillRect(columnStartPointX, histogramColCurrentY, histogramColWidth, histogramColHeigth);

    ctx.fillStyle = textColor;
    ctx.fillText(Math.round(times[i]), columnStartPointX, histogramColCurrentY - textlineHeigth);
    columnStartPointX = columnStartPointX + columnSpacing + histogramColWidth;
  }
};
