import multiparty from 'multiparty';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL  } from 'firebase/storage';
import { isAdmin } from './auth/[...nextauth]';
import { mongooseConnect } from '@/lib/mongoose';

const firebaseConfig = {
  apiKey: process.env.FB_API_KEY,
  authDomain: process.env.FB_AUTH_DOMAIN,
  projectId: process.env.FB_PROJECT_ID,
  storageBucket: process.env.FB_STORAGE_BUCKET,
  messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
  appId: process.env.FB_APP_ID,
  measurementId: process.env.FB_MEASURMENT_ID

};

export default async function handle(req, res) {
  await mongooseConnect();
  await isAdmin(req, res);

  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);
  const form = new multiparty.Form();

  const {fields, files} = await new Promise ((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({fields, files});
    })
  })
  const links = []
  for ( const file of files.file) {

  const ext = file.originalFilename.split('.').pop()
  const fileName = file.originalFilename.split('.')[0] + '_' + Date.now() + '.' + ext;

  const metadata = {
    contentType: file.headers['content-type'],
  };

  const fileBuffer = require('fs').readFileSync(file.path);
  const storageRef = ref(storage, 'next/' + fileName);
  await uploadBytes(storageRef, fileBuffer, metadata);
  const downloadURL = await getDownloadURL(storageRef);
  links.push(downloadURL)
}

return res.json({links});
}


export const config = {
  api: {
    bodyParser: false,
  },
};
