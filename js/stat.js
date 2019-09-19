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
  var maxTimePoints = 0; // максимальное значение из массива times[], показателя времени
  var textHistogramDistance = 20; // растояние от верхней границы подписи, до столбца гистограммы

  drowStatisticsCloud(ctx, 110, 20, 420, 270, 10, 'rgba(0, 0, 0, 0.7)');
  drowStatisticsCloud(ctx, 100, 10, 420, 270, 10, 'rgb(255, 255, 255');

  // вывод заголовка экрана статистики
  ctx.fillStyle = 'rgb(0, 0, 0)';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', 220, 30);
  ctx.fillText('Список результатов:', 220, 50);

  // максимальное значение времени игроков
  for (var y = 0; y < times.length; y++) {
    if (maxTimePoints < times[y]) {
      maxTimePoints = times[y];
    }
  }

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillText(names[i], columnStartPointX, 250);

    // выбор цвета столбца гистограммы
    // если игрок 'Вы' столбец красный, в противном случае в оттенках синего
    // со случайным значением насыщености
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(240,' + (Math.floor(Math.random() * 76) + 25).toString() + '%, 25%)';
    }

    histogramColHeigth = (times[i] * histogramColMaxHeigth) / maxTimePoints;
    histogramColCurrentY = histogramColStartY + (histogramColMaxHeigth - histogramColHeigth);
    ctx.fillRect(columnStartPointX, histogramColCurrentY, histogramColWidth, histogramColHeigth);

    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillText(Math.round(times[i]), columnStartPointX, histogramColCurrentY - textHistogramDistance);
    columnStartPointX = columnStartPointX + columnSpacing + histogramColWidth;
  }
};
