exports.uploadImage = (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "이미지 파일이 필요합니다." });
        }

        // 이미지 URL 생성 (서버에 호스팅된 경로)
        const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;

        res.status(200).json({ imageUrl });
    } catch (error) {
        console.error("Error uploading image:", error);
        res.status(500).json({ message: "이미지 업로드에 실패했습니다." });
    }
};