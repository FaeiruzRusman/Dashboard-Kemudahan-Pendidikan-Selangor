# Dashboard Kemudahan Pendidikan Negeri Selangor

Dashboard tematik **Selangor Urban Observatory (SUO)** untuk PLANMalaysia Selangor.

## Modul versi 1
- Peta interaktif sekolah (Leaflet / OpenStreetMap)
- KPI bilangan sekolah mengikut kategori dan daerah
- Carian dan penapis jenis sekolah / daerah
- Carta taburan sekolah dan semakan kualiti rekod
- Direktori, muat naik GeoJSON/CSV, eksport CSV
- Modul perancangan lanjutan (belum diaktifkan)

## Data
GeoJSON sedia ada disimpan di `data/sekolah_negeri_selangor.geojson`. Format: GeoJSON FeatureCollection, geometri Point WGS84 [longitude,latitude] serta atribut nama, jenis dan daerah. Pilihan sementara: muat naik GeoJSON/CSV melalui kawalan pada dashboard.

**Dataset sudah dimasukkan:** 945 titik sekolah (664 sekolah rendah; 281 sekolah menengah) disalin daripada SUO 3D GeoPortal, fail `data/pendidikan/sekolah_negeri_selangor.geojson`. Dataset berasingan JAIS kini juga telah diimport; lihat nota di bawah. Kedua-dua sumber masih perlu disemak dari segi tarikh, kelengkapan dan ketepatan sebelum dianggap statistik rasmi.

## Terbitkan GitHub Pages
Settings → Pages → Deploy from a branch → main / (root) → Save.

Alamat selepas GitHub Pages diaktifkan:
https://faeiruzrusman.github.io/Dashboard-Kemudahan-Pendidikan-Selangor/

© PLANMalaysia Selangor | SUO

## Sempadan dan query pentadbiran
- Layer **Sempadan Daerah** diambil daripada fail asal `selangor-3d-map/data/pentadbiran/sempadan_daerah_selangor.geojson` melalui raw GitHub.
- Layer **Sempadan PBT 2024** disalin daripada GeoPortal ke `data/sempadan_pbt_selangor_2024.geojson` (12 PBT).
- Pilih Daerah dan/atau PBT untuk menapis rekod sekolah dan mengemas kini KPI, graf serta direktori.
- Klik poligon dalam peta untuk menapis kawasan, atau gunakan butang **Zum kawasan dipilih**.
- Padanan PBT mengutamakan semakan titik-dalam-poligon; jika di luar kawasan, kod PBT asal digunakan sebagai fallback. Keputusan tertakluk kepada ketepatan koordinat dan sempadan.

## Integrasi Sekolah Agama JAIS (14 Oktober 2026)
- Sumber: fail pengguna `Sekolah Agama Negeri Selangor_JAIS.zip` (Shapefile, EPSG:3380) dan ditukar ke GeoJSON WGS84 untuk pemaparan web.
- Fail dataset: `data/sekolah_agama_jais_selangor.geojson` — **268** rekod JAIS: 229 SRA, 11 SRAI, 23 SAM/SAMT dan 5 MITS.
- **Audit diperbetulkan (14 Okt 2026):** semua 268 rekod adalah geometri Point di SHP, tetapi **258 mempunyai koordinat yang boleh ditukar kepada WGS84 dalam julat Selangor** dan **10 memegang sentinel tidak sah**. Kolum `HAS_GEOM=YA` (112) / `TIDAK` (156) menunjukkan status pemadanan, bukan semestinya kewujudan titik. 146 daripada 156 bertanda `TIDAK` mempunyai koordinat geometri, tetapi belum semestinya disahkan ketepatan lokasi.
- Perbandingan nama sekolah yang dinormalkan bersama daerah menemui **15 pertindihan** dengan dataset GeoPortal SUO. Rekod JAIS diutamakan supaya tidak dikira dua kali.
- Jumlah selepas deduplikasi ialah **1,198 rekod unik**: 664 sekolah rendah, 266 sekolah menengah dan 268 sekolah agama.
- Fail JAIS GeoJSON ini mengekalkan nama, daerah, subkategori, status lokasi dan nombor rekod; **alamat terperinci serta medan lain dalam Shapefile asal belum disalin**. Rujuk ZIP asal untuk metadata penuh.
- Penapis PBT bagi rekod JAIS berkoordinat ditentukan melalui titik-dalam-poligon. Untuk rekod tanpa koordinat dan tanpa kod PBT sumber, PBT tidak dapat ditentukan dengan pasti; penapisan daerah kekal tersedia.

## Education Spatial Intelligence — Coverage & Nearest School (Oktober 2026)
- Dua modul tersedia pada halaman yang sama melalui tab **School Coverage Analysis** dan **Nearest School Analysis**, dengan peta Leaflet analisis berasingan.
- Coverage: buffer bulatan geodesik berjejari **500 m, 1 km, 3 km atau 5 km**, untuk satu sekolah pilihan atau semua sekolah yang memenuhi penapis. **Ini bukan service area rangkaian jalan**.
- Nearest: klik lokasi rujukan atas peta analisis untuk mendapatkan **lima sekolah paling hampir berdasarkan jarak geodesik**. Garisan putus-putus menggambarkan jarak garis lurus, **bukan laluan memandu**.
- Kedua-duanya mematuhi penapis utama Daerah, PBT, Jenis Sekolah, Kategori Sekolah dan carian nama/alamat.
- Daripada **1,198 rekod unik**, selepas pemulihan shapefile **1,188** mempunyai koordinat yang boleh digunakan dan **10** JAIS tiada koordinat sah. Ini bukan pengesahan bahawa semua 1,188 lokasi telah diaudit di lapangan.
- Kod: `education-analysis.js` dan `education-analysis.css`; menggunakan Leaflet dan OpenStreetMap tanpa API routing berbayar.

## Unified Workspace UI (14 Oktober 2026)
- Antara muka kini mengikut Dashboard Kemudahan Keselamatan SUO: KPI di atas, tiga tab **Overview / Coverage Analysis / Nearest School**, dan workspace **kawalan kiri – peta tengah – hasil analisis kanan**.
- Overview menggunakan peta sedia ada, manakala Coverage dan Nearest berkongsi satu peta analisis dalam ruangan yang sama. Pengguna tidak perlu scroll ke peta kedua.
- Dua peta Leaflet diuruskan oleh `education-mode.js` yang mengawal visibility dan `invalidateSize()` semasa pertukaran tab.
- Stylesheet khusus: `education-workspace.css`. Enjin analisis kekal dalam `education-analysis.js`.
- Data, pilihan kategori sekolah, penapis Daerah/PBT, direktori dan geometri asal tidak diubah oleh penstrukturan UI ini.

## Audit koordinat JAIS asal (14 Oktober 2026)
- Semak `data/SEMAKAN-KOORDINAT-JAIS.md` untuk 10 rekod tidak sah dan kaedah pemulihan titik asal.
- 138 titik dari Shapefile asal dipulihkan menggunakan nama + daerah; 8 titik hasil semakan terkini dikekalkan; jumlah 258 JAIS bertitik dan 10 tidak sah.
- Paparan Coverage/Nearest menggunakan semua titik yang kini tersedia, tetapi keputusan berkaitan 146 lokasi bertanda `HAS_GEOM=TIDAK` asal mestilah dianggap **indikatif** sehingga ketepatan lokasi disahkan.

## Rekod sekolah JAIS selepas deduplikasi (14 Oktober 2026)
- Sumber asal JAIS mempunyai **268 rekod**, termasuk dua rekod sejarah bagi institusi **SRA Sungai Manggis → SRAI Sungai Manggis** yang disahkan sebagai sekolah sama oleh pengguna.
- Dataset operasi dashboard sekarang mempunyai **267 sekolah JAIS unik**: **262 berkoordinat** dan **5 tanpa geometri sah** (semuanya dalam Kuala Selangor).
- **Kuala Langat lengkap**: 28 sekolah JAIS unik berkoordinat; rekod SRA lama diintegrasi sebagai atribut sejarah pada rekod SRAI, bukan titik pendua.
- Oleh itu bilangan keseluruhan sekolah unik dashboard akan turun satu rekod (daripada **1,198 kepada 1,197**) berbanding angka sebelum penggabungan, tertakluk logik deduplikasi GeoPortal sedia ada. Bilangan terdahulu dalam dokumen ini ialah snapshot asal.

## Penutupan pemetaan koordinat JAIS — 14 Oktober 2026
- **267/267 sekolah JAIS unik mempunyai geometri Point WGS84**, selepas gabungan rekod SRA Sungai Manggis ke SRAI Sungai Manggis.
- **9/9 daerah** selesai dari segi ketersediaan geometri sekolah JAIS; **0 rekod tanpa koordinat**.
- Lima lokasi terakhir Kuala Selangor ditambah berdasarkan koordinat dibekalkan pengguna. Rujuk `data/SEMAKAN-KOORDINAT-JAIS.md`.
- Nota: analisis Coverage / Nearest boleh menggunakan semua titik, namun sebahagian geometri asal JAIS berstatus belum disahkan ketepatan di lapangan. Statistik bersejarah dalam README ini ialah snapshot sebelum pemulihan dan deduplikasi.

## Accessibility & Travel Time — Fasa 1 (14 Oktober 2026)
- Tab keempat `Accessibility & Travel Time` dalam workspace **kawalan kiri, peta tengah, keputusan kanan**, tanpa peta bawah tambahan.
- Mod **driving** menggunakan endpoint OSRM demo awam `https://router.project-osrm.org/route/v1/driving/{lon,lat};{lon,lat}?overview=full&geometries=geojson&steps=false&alternatives=false` (lihat [OSRM HTTP API](https://project-osrm.org/docs/v26.5.0/http)).
- Aliran: buka tab → klik titik asal atas peta tengah → pilih sekolah daripada senarai berdasarkan penapis semasa (atau pilih sekolah paling hampir secara **garis lurus**) → tekan **Kira laluan memandu** → papar garis laluan, **jarak km melalui jalan** dan **anggaran minit**.
- **PENTING:** butang “sekolah terdekat” menilai **jarak garis lurus** untuk memilih destinasi, bukan membuat perbandingan semua sekolah menurut masa perjalanan. Hanya satu laluan dipanggil setiap kali; tiada dakwaan bahawa sekolah yang dipilih semestinya paling cepat dicapai.
- Anggaran OSRM berdasarkan profil rangkaian jalan dan kelajuan routing, **tanpa trafik langsung**. Posisi mula/tamat disnap ke jalan berhampiran; amaran diberikan sekiranya snapping melebihi 100 meter.
- API demo OSRM disediakan **best effort untuk prototaip/ujian**, bukan servis berjaminan; pembekal boleh mengehadkan atau menarik akses. Elakkan penggunaan skala besar/produksi. Had klien: satu permintaan pada satu-satu masa dan sekurang-kurangnya 1.25 saat antara permintaan; timeout 16 saat. Untuk penggunaan rasmi, konfigurasikan routing backend/OSRM sendiri dengan ketersediaan dan polisi akses yang sesuai.
- **Tiada API key disimpan dalam JavaScript / frontend.** Modul `education-routing.js` menggunakan endpoint demo tanpa kunci sahaja.
- Apabila menukar tab atau menukar penapis, permintaan yang sedang berjalan dibatalkan; analisis lama tidak dipaparkan sebagai keputusan baharu.
