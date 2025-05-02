import admin from 'firebase-admin';
import serviceAccount from './serviceAccountKey.json' assert { type: 'json' };
import fetch from 'node-fetch'; 

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();


const seedFakeStoreProducts = async () => {
  try {
    const res = await fetch('https://fakestoreapi.com/products');
    const products = await res.json();

    const batch = db.batch();
    products.forEach((product) => {
      const docRef = db.collection('products').doc();
      batch.set(docRef, product);
    });

    await batch.commit();
    console.log('FakeStore products seeded successfully.');
  } catch (err) {
    console.error('Failed to seed products:', err);
  }
};

if (process.argv[2] === 'seed') {
  seedFakeStoreProducts();
}

export { db };
