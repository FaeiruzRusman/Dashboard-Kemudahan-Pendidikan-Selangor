> **AUDIT SEMULA SHAPEFILE ASAL — 14 Oktober 2026**
>
> Selepas membaca geometri sebenar fail `Sekolah Agama Negeri Selangor_JAIS.zip` (EPSG:3380), kesimpulan lama berasaskan `HAS_GEOM=TIDAK` telah diperbetulkan. **Semua 268 rekod adalah objek Point dalam fail SHP, tetapi 10 mempunyai koordinat sentinel tidak sah** dan tidak boleh digunakan; **258 mempunyai koordinat dalam julat Selangor** selepas transformasi WGS84.
>
> Sebanyak **138 titik yang pernah dibuang ketika integrasi awal telah dipulihkan** dengan padanan **nama sekolah + daerah**. **8 titik yang telah dikemas kini melalui pengesahan/carian kemudian dikekalkan**, tidak ditimpa oleh geometri asal. Status geometri `HAS_GEOM=TIDAK` tidak semestinya bermaksud tiada titik; bagi 146 rekod berkaitan, ia menunjukkan status semakan lokasi belum disahkan. Geometri bukan jaminan ketepatan sekolah di lapangan.
>
> **Klang sekarang 32/33 rekod bertitik; hanya SRA Hajjah Fatimah tanpa titik.** Jangan bergantung pada senarai “belum ditemui” di bawah sebagai status ketiadaan titik—ia ialah catatan penyelidikan sebelum audit geometri.
>
> **10 baki bergeometri tidak sah:** SRA Sungai Buloh, SRA Sungai Sembilang, SRA Jeram Batu 20, SRA Batu 4 Tanjong Karang, SRA Ujung Permatang (Kuala Selangor); SRA Kampung Soeharto (Hulu Selangor); SRA Taman Ehsan dan SRA Sungai Chinchin (Gombak); SRA Hajjah Fatimah (Klang); SRA Sungai Manggis (Kuala Langat).

# Semakan Koordinat Sekolah Agama JAIS — Mengikut Daerah

Tarikh kemas kini: 14 Oktober 2026. Koordinat GeoJSON disimpan dalam susunan **[longitude, latitude]** EPSG:4326. Padanan awam belum semestinya pengesahan lapangan.

## Batch 1 — Petaling

- **SRA Taman Datuk Harun** — 3.082630, 101.635850 — padanan sekolah OSM way 482083890, https://mapcarta.com/W482083890 ; Waze turut memadankan sekolah di Jalan 9. **Dimasukkan**.
- **SRA Bukit Cherakah** — **3.1751759020289443, 101.45482335450616** (latitude, longitude). Koordinat diberikan dan disahkan oleh pengguna pada 14 Oktober 2026. **Dimasukkan ke GeoJSON**. Semakan Daerah Petaling lengkap: 31/31 rekod JAIS mempunyai koordinat.

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

## Pengesahan tambahan — 14 Oktober 2026
- **SRA Hajjah Fatimah (Klang)** — latitude **3.036052983124771**, longitude **101.46882336821469**; disahkan oleh pengguna dan dimasukkan sebagai titik WGS84.
- **Batch Klang lengkap: 33/33 sekolah JAIS bertitik.** Petaling kekal lengkap 31/31.
- **Status negeri selepas kemas kini:** 259 daripada 268 sekolah JAIS mempunyai koordinat; baki **9** tanpa geometri sah. Rekod tanpa titik: SRA Sungai Buloh, SRA Sungai Sembilang, SRA Jeram Batu 20, SRA Batu 4 Tanjong Karang, SRA Ujung Permatang (Kuala Selangor); SRA Kampung Soeharto (Hulu Selangor); SRA Taman Ehsan dan SRA Sungai Chinchin (Gombak); SRA Sungai Manggis (Kuala Langat).
- Nota: angka dan senarai dalam bahagian audit awal di atas merupakan **snapshot sebelum pengesahan SRA Hajjah Fatimah**.

## Batch Gombak selesai — 14 Oktober 2026
- **SRA Taman Ehsan (Gombak)** — 3.220728016189946, 101.62209542838545 (lat, lon), disahkan oleh pengguna. Titik GeoJSON: [101.62209542838545, 3.220728016189946].
- **SRA Sungai Chinchin (Gombak)** — 3.2470196924040646, 101.71519382325849 (lat, lon), disahkan oleh pengguna. Titik GeoJSON: [101.71519382325849, 3.2470196924040646].
- **Gombak lengkap 17/17 rekod bertitik.** Jumlah JAIS semasa: **261/268** bertitik dan **7** belum berkoordinat.
- Baki: Kuala Selangor (5), Hulu Selangor (1), Kuala Langat (1). Audit rekod bertanda `HAS_GEOM=TIDAK` masih diperlukan bagi ketepatan lokasi di lapangan.
