---
title: "Transform Data dengan Amazon S3 Object Lambda (Indonesian)"
pubDate: '2022-10-02'
description: 'Cara menggunakan S3 Object Lambda untuk transformasi data on-the-fly tanpa menyimpan duplikat. Contoh konversi CSV ke JSON menggunakan Lambda function.'
tags: ['aws', 's3', 'lambda', 'serverless']
category: 'engineering'
lang: 'id'
---

![aws.amazon.com](https://miro.medium.com/v2/resize:fit:1400/format:webp/0*cqwnaAoALQMoKjKL.png)

Amazon S3 digunakan untuk menyimpan data yang dapat dibagikan ke berbagai aplikasi. Namun, sebagian aplikasi membutuhkan <mark>format data yang spesifik</mark>. Kita bisa menyimpan data dalam banyak format, tetapi pendekatan tersebut tidak efisien. Alternatifnya, transform data sebelum dikonsumsi aplikasi.

Dengan <mark>Amazon S3 Object Lambda</mark>, kita dapat menjalankan Lambda function setiap kali aplikasi mengambil data. Fungsi tersebut dapat mengubah data ke format yang dibutuhkan, sehingga <mark>tak perlu menyimpan banyak versi data</mark> di S3.

Contoh penggunaan: aplikasi membutuhkan data JSON, sementara file di S3 masih berupa CSV.

## Prerequisite:

*   Buat Lambda function untuk convert CSV ke JSON. Contoh kodenya tersedia di repo ini: <mark>[lambda-csv-to-json/index.py](https://github.com/fauzanjantung/lambda-csv-to-json/blob/main/index.py)</mark>

Untuk memulai, buka S3 terlebih dahulu.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*3OC2mbuEGoFy6H8b1qbxqw.png)

Lalu buat bucket yang publicly accessible, dan upload data ke bucket tersebut. Contoh dataset CSV yang akan digunakan:

Username,Login email,Identifier,First name,Last name
booker12,rachel@example.com,9012,Rachel,Booker
grey07,laura@example.com,2070,Laura,Grey
johnson81,craig@example.com,4081,Craig,Johnson
jenkins46,mary@example.com,9346,Mary,Jenkins
smith79,jamie@example.com,5079,Jamie,Smith

Berikut langkah membuat pipeline transformasi dengan Object Lambda:

- Buka tab **Access Points**, kemudian klik **Create access point**.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*h5HK9SIhgQoSQ82qWWllTg.png)

- Isi nama access point, pilih **Network Origin**. Di contoh ini gunakan Internet Network Origin dan hilangkan centang “Block all public access” agar bisa diakses publik. Setelah selesai, klik **Create access point**.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*kYz-k8L0uBIJ-d2D8gD7Ng.png)![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*ISszmpj0YMBDfvNHwsKhvA.png)

- Buka menu **Object Lambda Access Points** di sidebar, lalu pilih **Create Object Lambda Access Point**.

![](https://miro.medium.com/v2/resize:fit:366/format:webp/1*mQP41q9R_eccmHTOcC3lKA.png)![](https://miro.medium.com/v2/resize:fit:1636/format:webp/1*no26TBxxb4Rse7v1MiIHpQ.png)

- Isi nama Object Lambda Access Point, pilih region, kemudian pilih Access Point yang baru dibuat melalui **Browse S3**. Selanjutnya, pilih Lambda function <mark>CsvToJsonConverter</mark> yang sudah disiapkan.

![](https://miro.medium.com/v2/resize:fit:1152/format:webp/1*L6pfXpCXojxeJjXpE6OLeQ.png)![](https://miro.medium.com/v2/resize:fit:850/format:webp/1*kSXQ0OX66i8vJCPh_SSsNg.png)

- Klik **Create Object Lambda Access Point**.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*SwZ38I115R7rQV6CQgwYxQ.png)

- Buka detail Object Lambda Access Point dan salin ARN-nya.

![](https://miro.medium.com/v2/resize:fit:1188/format:webp/1*dd2ShDYs7lkZR8XI26MRew.png)![](https://miro.medium.com/v2/resize:fit:814/format:webp/1*srIbkO0hDE43WwgeOUH_DQ.png)

- Terakhir, buat satu Lambda function lagi untuk mengambil data yang sudah dikonversi. Contoh kode:

```python
import boto3
s3 = boto3.client('s3')

def lambda_handler(event, context):
    response = s3.get_object(
        Bucket='{OBJECT-LAMBDA-ACCESS-POINT}',
        Key='dev-team.csv')
    
    return response['Body'].read()
```

Ganti `{OBJECT-LAMBDA-ACCESS-POINT}` dengan ARN yang telah disalin. Setelah membuat fungsi, konfigurasi test event, lalu jalankan pengujian. Lambda tersebut akan mengembalikan respons JSON—hasil konversi file CSV di bucket S3—sedangkan file asli tetap utuh.
Key= ‘dev-team.csv’

> return response[‘Body’].read()

Ganti `{OBJECT-LAMBDA-ACCESS-POINT}` dengan ARN yang telah disalin. Setelah membuat fungsi, konfigurasi test event, lalu jalankan pengujian. Lambda tersebut akan mengembalikan respons JSON—hasil konversi file CSV di bucket S3—sedangkan file asli tetap utuh.

![](https://miro.medium.com/v2/resize:fit:1276/format:webp/1*v7Lv3E58gaUcQLxFOun_kA.png)![](https://miro.medium.com/v2/resize:fit:726/format:webp/1*JhOQeEymKH1hlzuYJ7kd_w.png)