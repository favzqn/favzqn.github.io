---
title: 'Automate Code Review dengan Amazon CodeGuru'
pubDate: '2022-11-12'
description: 'Panduan menggunakan Amazon CodeGuru untuk otomatisasi code review berbasis machine learning dan integrasi dengan AWS CodeCommit.'
tags: ['aws', 'codeguru', 'code-review', 'devops']
category: 'engineering'
---

![https://aws.amazon.com/](https://miro.medium.com/v2/resize:fit:1400/format:webp/0*dYLMVPBTxZ84okmD.png)

Amazon CodeGuru adalah sebuah <mark>_code review automation service_ dari AWS</mark> yang bisa membantu mengevaluasi _code_ kita, dan <mark>merekomendasikan _code_ terkait _performance_ aplikasi</mark> kita. Amazon CodeGuru ini <mark>menggunakan machine-learning untuk mendeteksi _defect_</mark> pada code. Untuk saat ini, <mark>hanya bahasa pemrograman Java saja yang di-support</mark>. Di tulisan ini kita akan mencoba mengasosiasikan AWS CodeCommit dengan Amazon CodeGuru.

Prerequisites: <mark>Silahkan buat code repository terlebih dahulu di Amazon CodeCommit</mark>.

Setelah code repository terbuat, <mark>buka halaman Amazon CodeGuru</mark>, dan buka sub-menu Repositories. Lalu klik <mark>Associate repository and run analysis</mark>.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*8kBylENPDr_dA11pKKHHtQ.png)

<mark>Pilih AWS CodeCommit sebagai source provider</mark>, dan pilih juga repository locationnya.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*YqBt4azEAx309cdR0UE7Jw.png)

Lalu <mark>pilih branch yang nantinya akan di-scan</mark> oleh Amazon CodeGuru, lalu Asosiasikan.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*eDRFolMfboHkYcmvWITZmw.png)

Sekarang, <mark>coba commit dan push code</mark> tersebut ke repo Amazon CodeCommit. Jika sudah, <mark>buat pull request</mark>.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*sszpfJMyuC6mFfYloqp3iw.png)

![](https://miro.medium.com/v2/resize:fit:2000/format:webp/1*bvWjT2RXD8e5Z3gKnOr7uQ.png)

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*GE8n9zk6cWUy1FPhLa7Z0g.png)

![](https://miro.medium.com/v2/resize:fit:2000/format:webp/1*36IgA0DYyGAmj5g6PVeyqw.png)

Di tab _Changes_, Amazon CodeGuru akan <mark>memberi komen jika ada code yang bisa di-_fix_ atau di-_improve_</mark>.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*aCcWSfqpIhmCyHkJZznCiw.png)