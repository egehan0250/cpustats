var os = require("os");

//CPU bilgilerini almak için işlev oluştur
function cpuAverage() {

// Boşta kalma ve çekirdek zamanının toplamını başlat ve CPU bilgilerini getir
  var totalIdle = 0, totalTick = 0;
  var cpus = os.cpus();

//CPU çekirdekleri arasında döngü
  for(var i = 0, len = cpus.length; i < len; i++) {

//CPU çekirdeğini seçin
    var cpu = cpus[i];

//Çekirdek işaretindeki süreyi topla
    for(type in cpu.times) {
      totalTick += cpu.times[type];
   }     

//çekirdeğin boşta kalma süresini topla
    totalIdle += cpu.times.idle;
  }

//Ortalama Boşta Kalma ve Tıklanma sürelerini döndür
  return {idle: totalIdle / cpus.length,  total: totalTick / cpus.length};
}

//İlk CPU Ölçüsünü al
var startMeasure = cpuAverage();

//İkinci Ölçü için gecikme ayarla
setInterval(function() { 

//ikinci Ölçüyü al
  var endMeasure = cpuAverage(); 

//Ölçümler arasındaki boşta kalma ve toplam süre farkını hesapla
  var idleDifference = endMeasure.idle - startMeasure.idle;
  var totalDifference = endMeasure.total - startMeasure.total;

//Ortalama CPU kullanım yüzdesini hesapla
  var percentageCPU = 100 - ~~(100 * idleDifference / totalDifference);

//sonucu konsola yazdır
  console.clear()
  console.log(percentageCPU + "% CPU Usage.");

}, 10);
