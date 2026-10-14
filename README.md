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
Simpan GeoJSON sebenar di `data/sekolah_negeri_selangor.geojson`. Format: GeoJSON FeatureCollection, geometri Point WGS84 [longitude,latitude] serta atribut nama, jenis dan daerah. Pilihan sementara: muat naik GeoJSON/CSV melalui kawalan pada dashboard.

**Dataset sebenar belum dimasukkan, tiada angka rekaan.** Semak rekod dan metadata sumber sebelum diterbitkan sebagai statistik rasmi.

## Terbitkan GitHub Pages
Settings → Pages → Deploy from a branch → main / (root) → Save.

Alamat selepas GitHub Pages diaktifkan:
https://faeiruzrusman.github.io/Dashboard-Kemudahan-Pendidikan-Selangor/

© PLANMalaysia Selangor | SUO
