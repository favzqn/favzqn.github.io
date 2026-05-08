---
title: 'Serve Files Lebih Cepat dengan CloudFront CDN (Indonesian)'
pubDate: '2022-10-17'
description: 'Cara menggunakan Amazon CloudFront sebagai CDN untuk mempercepat pengiriman file dari S3 ke pengguna di seluruh dunia menggunakan edge locations.'
tags: ['aws', 'cloudfront', 'cdn', 's3']
category: 'engineering'
lang: 'id'
---

![docs.aws.amazon.com](https://miro.medium.com/v2/resize:fit:1196/format:webp/0*szZE95ecnMgR17Rb.png)

Amazon CloudFront adalah sebuah layanan <mark>content delivery network (CDN)</mark>. Kita dapat mempercepat pengiriman file statis melalui protokol HTTP/HTTPS karena <mark>CloudFront secara otomatis memilih edge location terdekat</mark>. Layanan ini tersebar di seluruh dunia—2 di Australia, 2 di Amerika Selatan, 13 di Asia, 16 di Eropa, dan 20 di Amerika Serikat—serta dapat dipantau performanya melalui <mark>Amazon CloudWatch</mark>.

Di tulisan ini, kita akan:

*   Membuat CloudFront distribution
*   Mengarahkan request pengguna ke domain distribution (bukan domain S3) agar <mark>CDN memilih edge location terdekat</mark>

## Prerequisites:

*   Siapkan file statis pada Amazon S3 bucket yang sudah <mark>ACLs enabled dan publicly accessible</mark>.

- Pergi ke menu CloudFront, lalu klik **Create distribution**.

![](https://miro.medium.com/v2/resize:fit:994/format:webp/1*8NGUK9v4NvMWCJ13n8lS_w.png)![](https://miro.medium.com/v2/resize:fit:1008/format:webp/1*FMmyCphn5OY9voWpZFR7bQ.png)

- Pada dropdown **Origin domain**, pilih S3 bucket yang sudah disiapkan, lalu klik **Create control setting**.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*uPZcf-6juChe8VQITZqjfw.png)

- Masukkan nama bucket, pastikan opsi **Signing behavior** diset ke <mark>Sign requests</mark>, lalu klik **Create**.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*h-OUppbrTeB69tSxdMucuQ.png)

- Di bagian **Settings**, pilih price class. Contohnya, gunakan <mark>"Use all edge locations (best performance)"</mark> untuk jangkauan maksimum. Jika ingin hemat biaya, pilih price class yang lebih terbatas.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*Y8Hqvasmv81a6caM_CS9QQ.png)

- Biarkan pengaturan lainnya default, kemudian klik **Create distribution**.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*bgmETgbbxw9BvV3UspRk0Q.png)

- Setelah distribution aktif, bandingkan kecepatan akses file langsung dari S3 dengan domain CloudFront. <mark>Gunakan domain distribution</mark> saat pengguna mengunduh file, dan amati perbedaannya—biasanya CloudFront memuat lebih cepat dibanding akses langsung ke S3.

![](https://miro.medium.com/v2/resize:fit:2000/format:webp/1*dwtDAutJe2_ry93oBQBwdg.png)

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*PgPxnqpcuzrC097xNatqDg.png)