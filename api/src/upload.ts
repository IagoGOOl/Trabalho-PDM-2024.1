import multer from 'multer';

const storage = multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null, './src/uploads');
	},
	filename: (request, file, callback) => {
		const fileName = `${file.fieldname}-${Date.now()}-${file.originalname}`;
		const fileNameClear = fileName.replace(/\s/g, '-');
		callback(null, fileNameClear);
	},
});

export const upload = multer({ storage });
