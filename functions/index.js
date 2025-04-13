const { onRequest } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });

admin.initializeApp();
const db = admin.firestore();

exports.submitReview = onRequest((req, res) => {
  cors(req, res, async () => {
    try {

      const { mentorId, rating } = req.body;

      if (!mentorId || !rating) {
        console.error('Missing mentorId or rating');
        return res.status(400).send('Missing mentorId or rating');
      }

      const mentorRef = db.doc("mentors/" + mentorId);
      const mentorDoc = await mentorRef.get();

      if (!mentorDoc.exists) {
        return res.status(404).send('Mentor document not found');
      }

      const mentorData = mentorDoc.data();
      const currentRatingSum = mentorData.ratingSum || 0;
      const currentReviewsCount = mentorData.totalReviews || 0;
      const newRatingSum = currentRatingSum + rating;
      const newReviewsCount = currentReviewsCount + 1;
      const newAverageRating = newRatingSum / newReviewsCount;

      await mentorRef.update({
        rating: newAverageRating,
        ratingSum: newRatingSum,
        totalReviews: newReviewsCount,
      });
      res.status(200).send("Review submitted successfully.");
    } catch (error) {
      res.status(500).send(`Error submitting review: ${error.message}`);
    }
  });
});

exports.findClosestLocation = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const { latitude: userLat, longitude: userLng } = req.body;

      if (userLat == null || userLng == null) {
        return res.status(400).send("Missing latitude or longitude.");
      }

      const locationsSnapshot = await db.collection("Locations").get();
      if (locationsSnapshot.empty) {
        return res.status(404).send("No support center locations found.");
      }

      let closestLocation = null;
      let minDistance = Infinity;

      const toRad = (degree) => degree * (Math.PI / 180);
      const R = 6371;

      locationsSnapshot.forEach(doc => {
        const loc = doc.data();

        const dLat = toRad(loc.latitude - userLat);
        const dLng = toRad(loc.longitude - userLng);
        const a =
          Math.sin(dLat / 2) ** 2 +
          Math.cos(toRad(userLat)) * Math.cos(toRad(loc.latitude)) *
          Math.sin(dLng / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;

        if (distance < minDistance) {
          minDistance = distance;
          closestLocation = {
            id: doc.id,
            ...loc,
            distance
          };
        }
      });

      if (closestLocation) {
        res.status(200).json({ closestLocation });
      } else {
        res.status(404).send("No closest location found.");
      }

    } catch (error) {
      res.status(500).send(`Error finding closest location: ${error.message}`);
    }
  });
});
