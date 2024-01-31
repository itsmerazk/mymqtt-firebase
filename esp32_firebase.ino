#include <WiFi.h>
#include <FirebaseESP32.h>
#include <DHT.h>

#define FIREBASE_HOST "https://mymqtt-c2861-default-rtdb.firebaseio.com/"
#define FIREBASE_AUTH "AIzaSyBOYIsPaFA9Wg2nDwzhsXD6uKO0lr1YIiA"

const char* ssid = "UNDIKANet"; 
const char* password = "SemangatPagi:)"; 

#define DHTPIN 2
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);

FirebaseData firebaseData;
 

void setup_wifi() {
  // Konfigurasi koneksi WiFi
  WiFi.begin(ssid, password);
  Serial.println("Menghubungkan ke WiFi");

  int attempt = 0;
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
    attempt++;
    if (attempt > 10) { // Jika gagal terkoneksi setelah beberapa percobaan, coba lagi dari awal
      Serial.println("Gagal terkoneksi ke WiFi. Menyambung ulang...");
      WiFi.begin(ssid, password);
      attempt = 0;
    }
  }

  Serial.println("");
  Serial.println("Koneksi WiFi berhasil");
}

void setup() {
  Serial.begin(115200);
  setup_wifi();

  Firebase.begin(FIREBASE_HOST,FIREBASE_AUTH );
  dht.begin();
}

void loop() {

  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("Koneksi WiFi terputus. Menyambung ulang...");
    setup_wifi();
  }

  float kelembaban = dht.readHumidity();
  float suhu = dht.readTemperature();

  if (Firebase.ready()){
    Firebase.setFloat(firebaseData,"/kelembaban", kelembaban);
    Firebase.setFloat(firebaseData,"/suhu", suhu);
  }else{
    Serial.println("firebase not ready");
  }

  Serial.print("Kelembapan: ");
  Serial.print(kelembaban);
  Serial.print("%\t");
  Serial.print("Suhu: ");
  Serial.print(suhu);
  Serial.println("°C");


}