# Semakan Koordinat Sekolah Agama JAIS — Mengikut Daerah

Tarikh kemas kini: 14 Oktober 2026. Koordinat GeoJSON disimpan dalam susunan **[longitude, latitude]** EPSG:4326. Padanan awam belum semestinya pengesahan lapangan.

## Batch 1 — Petaling

- **SRA Taman Datuk Harun** — 3.082630, 101.635850 — padanan sekolah OSM way 482083890, https://mapcarta.com/W482083890 ; Waze turut memadankan sekolah di Jalan 9. **Dimasukkan**.
- **SRA Bukit Cherakah** — alamat Kampung Bukit Cherakah Jaya, Seksyen U15; rekod sekolah wujud dalam dokumen negeri, tetapi koordinat khusus belum disahkan. JANGAN gunakan titik KAFA FELDA Bukit Cherakah kerana berkemungkinan sekolah lain. **Tangguh**.

## Batch 2 — Klang

### Titik telah dimasukkan
- **SRA Taman Kem** — 2.998090, 101.401470 — OSM way 917044784, https://mapcarta.com/W917044784 (padanan tepat nama sekolah).
- **SRA Batu Belah** — 3.072920, 101.442980 — lokasi GPS khusus berlabel sekolah, https://malaysia.worldplaces.me/ms/review/222495311-sra-batu-belah.html (sumber komuniti; perlu audit lapangan).
- **SRA Sungai Serdang** — 3.147340, 101.328280 — lokasi GPS sekolah https://malaysia.worldplaces.me/view-place/27420961-sra-sungai-serdang.html (sumber komuniti; perlu audit lapangan).

### Calon perlu semakan (belum dimasukkan sebagai geometry)
- **SRA Pekan Meru** — dua padanan bercanggah, 3.13617,101.40764 (https://malaysia.worldplaces.me/schools-in-klang/54962796-sra-pekan-meru.html) dan 3.13744,101.43573 (https://malaysia.worldplaces.me/city/kapar/view-place/1889236-sekolah-rendah-agama-pekan-meru.html). Perlu semak bangunan sebenar.
- **SRA Pekan Kapar** — calon 3.13308,101.33713 (https://malaysia.worldplaces.me/view-place/69261402-sra-pekan-kapar.html). Belum disahkan dengan sumber kedua.
- **SRA Sungai Udang** — calon 3.04207,101.41717 (https://malaysia.worldplaces.me/ms/review/177330359-sra-sungai-udang.html). Lokasi calon mungkin berbeza dengan SRA Jalan Hassan; perlu pemeriksaan.
- Sekolah Klang lain tanpa padanan tepat masih kekal tanpa geometri.

## Prinsip integrasi
1. Padankan nama dan alamat asal Shapefile JAIS dengan bangunan/lokasi sekolah khusus.
2. Jangan guna centroid kampung, poskod, mukim, sekolah lain atau kawasan pentadbiran sebagai titik sekolah.
3. Simpan pautan sumber, tarikh, dan status keyakinan bagi setiap titik yang ditambah.
4. Tiada pengubahan koordinat yang telah ditandakan sah dalam Shapefile JAIS asal tanpa bukti lebih kukuh.
5. Jangan anggap padanan komuniti sebagai koordinat yang diaudit oleh JAIS.

## Susunan batch
Petaling → Klang → Gombak → Hulu Langat → Sepang → Kuala Langat → Kuala Selangor → Hulu Selangor → Sabak Bernam.
