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

**Dataset sudah dimasukkan:** 945 titik sekolah (664 sekolah rendah; 281 sekolah menengah) disalin daripada SUO 3D GeoPortal, fail `data/pendidikan/sekolah_negeri_selangor.geojson`. Dataset ini belum merangkumi semua sekolah agama/institusi lain; perlu semak tarikh, kelengkapan dan ketepatan sumber sebelum dianggap statistik rasmi.

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
