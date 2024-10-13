<?php
header('Content-Type: application/json');

// Contoh data yang diambil dari hasil scraping
$anime_data = [
    [
        'title' => 'Anime 1',
        'description' => 'Deskripsi anime 1',
        'link' => 'https://streaming-link.com/anime1',
        'genre' => ['Action', 'Adventure']
    ],
    // Tambahkan data lainnya
];

echo json_encode($anime_data);
?>
