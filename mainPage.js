// Firebase initialization
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAHwKiAQ96sLztPle7hYbxMCUvP8TFfNpg",
    authDomain: "fog-bc9ac.firebaseapp.com",
    projectId: "fog-bc9ac",
    storageBucket: "fog-bc9ac.firebasestorage.app",
    messagingSenderId: "1053322895319",
    appId: "1:1053322895319:web:2e4ebdb397a5280ab93592"
  });
  const db = firebaseApp.firestore();
  const auth = firebaseApp.auth();
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

function signIn() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // User signed in successfully
            alert("Login Successful!");
            window.location.href = "mainPage.html";  // Redirect to mainPage.html
        })
        .catch((error) => {
            alert("Error: " + error.message);
        });
}
  // Sign-out function
  const logout = () => {
    firebase.auth().signOut().then(() => {
      // Redirect to login page after logout
      window.location.href = "login.html";
    });
  };

  const saveTrainInfo = (event) => {
    event.preventDefault();
    
    const trainNumber = document.getElementById('train-number').value;
    const trainPosition = document.getElementById('train-position').value;
    
    // Store train info in Firestore
    db.collection('trainInfo').add({
      trainNumber: trainNumber,
      trainPosition: trainPosition,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then((docRef) => {
      // Update the display after data is saved
      document.getElementById('train-number-display').innerText = trainNumber;
      document.getElementById('train-position-display').innerText = trainPosition;
      
      // Here you would call a function to get the signals based on the train's position.
      displayNextSignals(trainPosition);
      
      // Show the train info display section
      document.getElementById('train-info-display').style.display = 'block';
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  };
  
  // Function to simulate fetching the next 3 signals
  const displayNextSignals = (trainPosition) => {
    // For simplicity, let's mock the signals. In real life, this should be based on the train's position.
    
    const signals = [
      "Green Signal (Next 2 km)",
      "Yellow Signal (Next 5 km)",
      "Red Signal (Next 10 km)"
    ];
    
    document.getElementById('signal-1').innerText = signals[0];
    document.getElementById('signal-2').innerText = signals[1];
    document.getElementById('signal-3').innerText = signals[2];
  };
  
  // Event listener for the form submission
  document.getElementById('train-info-form').addEventListener('submit', saveTrainInfo);
  