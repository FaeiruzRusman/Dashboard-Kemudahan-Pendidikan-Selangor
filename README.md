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
- **112** rekod ditandakan `HAS_GEOM=YA` dan mempunyai lokasi dalam shapefile; **156** ditandakan `HAS_GEOM=TIDAK` dan sengaja disimpan dengan `geometry:null`, walaupun sesetengahnya mengandungi geometri placeholder.
- Perbandingan nama sekolah yang dinormalkan bersama daerah menemui **15 pertindihan** dengan dataset GeoPortal SUO. Rekod JAIS diutamakan supaya tidak dikira dua kali.
- Jumlah selepas deduplikasi ialah **1,198 rekod unik**: 664 sekolah rendah, 266 sekolah menengah dan 268 sekolah agama.
- Fail JAIS GeoJSON ini mengekalkan nama, daerah, subkategori, status lokasi dan nombor rekod; **alamat terperinci serta medan lain dalam Shapefile asal belum disalin**. Rujuk ZIP asal untuk metadata penuh.
- Penapis PBT bagi rekod JAIS berkoordinat ditentukan melalui titik-dalam-poligon. Untuk rekod tanpa koordinat dan tanpa kod PBT sumber, PBT tidak dapat ditentukan dengan pasti; penapisan daerah kekal tersedia.

## Education Spatial Intelligence — Coverage & Nearest School (Oktober 2026)
- Dua modul tersedia pada halaman yang sama melalui tab **School Coverage Analysis** dan **Nearest School Analysis**, dengan peta Leaflet analisis berasingan.
- Coverage: buffer bulatan geodesik berjejari **500 m, 1 km, 3 km atau 5 km**, untuk satu sekolah pilihan atau semua sekolah yang memenuhi penapis. **Ini bukan service area rangkaian jalan**.
- Nearest: klik lokasi rujukan atas peta analisis untuk mendapatkan **lima sekolah paling hampir berdasarkan jarak geodesik**. Garisan putus-putus menggambarkan jarak garis lurus, **bukan laluan memandu**.
- Kedua-duanya mematuhi penapis utama Daerah, PBT, Jenis Sekolah, Kategori Sekolah dan carian nama/alamat.
- Daripada **1,198 rekod unik**, **1,042** mempunyai titik koordinat yang memenuhi julat validasi asas, dan **156** tidak mempunyai titik yang boleh digunakan. Ini tidak bermakna semua 1,042 lokasi telah diaudit ketepatannya di lapangan.
- Kod: `education-analysis.js` dan `education-analysis.css`; menggunakan Leaflet dan OpenStreetMap tanpa API routing berbayar.

## Unified Workspace UI (14 Oktober 2026)
- Antara muka kini mengikut Dashboard Kemudahan Keselamatan SUO: KPI di atas, tiga tab **Overview / Coverage Analysis / Nearest School**, dan workspace **kawalan kiri – peta tengah – hasil analisis kanan**.
- Overview menggunakan peta sedia ada, manakala Coverage dan Nearest berkongsi satu peta analisis dalam ruangan yang sama. Pengguna tidak perlu scroll ke peta kedua.
- Dua peta Leaflet diuruskan oleh `education-mode.js` yang mengawal visibility dan `invalidateSize()` semasa pertukaran tab.
- Stylesheet khusus: `education-workspace.css`. Enjin analisis kekal dalam `education-analysis.js`.
- Data, pilihan kategori sekolah, penapis Daerah/PBT, direktori dan geometri asal tidak diubah oleh penstrukturan UI ini.
