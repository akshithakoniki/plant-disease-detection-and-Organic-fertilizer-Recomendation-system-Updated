const dataset = {
    plant_diseases: {
        leaf_blight: {
            name: { en: 'Leaf Blight', te: 'ఊపిరి మచ్చ', hi: 'पत्ते की धब्बा' },
            symptoms: { en: 'Brown or black spots on leaves, often with a yellow halo.', te: 'పట్టాలపై బ్రౌన్ లేదా నలుపు మచ్చలు, సాధారణంగా పసుపు హాలోతో.', hi: 'पत्तियों पर भूरे या काले धब्बे, अक्सर पीले रंग की आभा के साथ।' },
            causes: { en: 'Fungal pathogens, high humidity.', te: 'ఫంగల్ పాథోజెన్లు, అధిక తేమ.', hi: 'फंगल पैथोजेंस, उच्च आर्द्रता।' },
            treatment: { en: 'Use copper-based fungicides and remove affected leaves.', te: 'తగ్గు ప్రభావిత ముల్లు తొలగించండి మరియు కాపర్ ఆధారిత ఫంగిసిడ్స్ ఉపయోగించండి.', hi: 'कॉपर आधारित फंगीसाइड्स का उपयोग करें और प्रभावित पत्तियों को हटा दें।' },
            prevention: { en: 'Ensure good air circulation and avoid overhead watering.', te: 'మంచి ఎయిర్ సర్క్యులేషన్ నిర్ధారించండి మరియు ఓవర్‌హెడ్ వంటరాన్ని తప్పించండి.', hi: 'अच्छी वायु परिसंचरण सुनिश्चित करें और ओवरहेड पानी से बचें।' }
        },
        // Add more diseases similarly
    },
    organic_reduction: {
        composting: {
            description: {
                en: 'The process of decomposing organic matter to produce compost, a nutrient-rich soil amendment.',
                te: 'ఆర్గానిక్ మ్యాటర్‌ను కీచిన వాతావరణంతో నిలుపుకుంటూ, పెరుగుదలకి ఉపయోగించే మంచి పంట.',
                hi: 'कार्बनिक पदार्थों को सड़ा कर खाद बनाने की प्रक्रिया, जो पोषक तत्वों से भरपूर होता है।'
            },
            // Add steps and benefits similarly
        },
        // Add more reduction techniques similarly
    },
    manure_making: {
        description: {
            en: 'The process of decomposing animal waste and organic matter to produce nutrient-rich fertilizer for plants.',
            te: 'జంతు మలాన్ని మరియు ఆర్గానిక్ మ్యాటర్‌ను డీకంపోజ్ చేసి, మొక్కలకు పోషకాలు గల ఎరువును తయారు చేయడం.',
            hi: 'पशु के कूड़े और कार्बनिक पदार्थों को सड़ा कर पौधों के लिए पोषक तत्वों से भरपूर उर्वरक तैयार करना।'
        },
        // Add steps similarly
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const camera = document.getElementById('camera');
    const canvas = document.getElementById('canvas');
    const constraints = {
        video: {
            width: { ideal: 1280 },
            height: { ideal: 720 }
        }
    };

    navigator.mediaDevices.getUserMedia(constraints)
        .then((stream) => {
            camera.srcObject = stream;
        })
        .catch((err) => {
            console.error('Error accessing the camera: ', err);
        });

    const imageInput = document.getElementById('imageInput');
    imageInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.src = e.target.result;
            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                const context = canvas.getContext('2d');
                context.drawImage(img, 0, 0, img.width, img.height);
                processImage(canvas.toDataURL('image/png'));
            };
        };
        reader.readAsDataURL(file);
    });
});

function capturePhoto() {
    const camera = document.getElementById('camera');
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    canvas.width = camera.videoWidth;
    canvas.height = camera.videoHeight;
    context.drawImage(camera, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL('image/png');
    processImage(imageData);
}

function uploadPhoto() {
    const imageInput = document.getElementById('imageInput');
    if (imageInput.files.length === 0) {
        alert('Please select an image file.');
        return;
    }

    const file = imageInput.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const img = new Image();
        img.src = event.target.result;

        img.onload = function() {
            const canvas = document.getElementById('canvas');
            const context = canvas.getContext('2d');

            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0, img.width, img.height);

            const imageData = canvas.toDataURL('image/png');
            processImage(imageData);
        };
    };

    reader.readAsDataURL(file);
}

function processImage(imageData) {
    // For simplicity, we'll simulate disease detection by randomly picking a disease from the dataset
    const diseases = Object.keys(dataset.plant_diseases);
    const randomDisease = diseases[Math.floor(Math.random() * diseases.length)];
    const diseaseInfo = dataset.plant_diseases[randomDisease];

    document.getElementById('diseaseResult').innerHTML = `
        <h3>Disease Detected: ${diseaseInfo.name.en}</h3>
        <p>Symptoms: ${diseaseInfo.symptoms.en}</p>
        <p>Causes: ${diseaseInfo.causes.en}</p>
        <p>Treatment: ${diseaseInfo.treatment.en}</p>
        <p>Prevention: ${diseaseInfo.prevention.en}</p>
    `;

    // Show organic reduction and manure making info after image is scanned
    document.getElementById('organicReduction').style.display = 'block';
    document.getElementById('manureMaking').style.display = 'block';

    // Replace with actual language preference logic
    const userLanguage = 'en'; // Change this to 'te' or 'hi' based on user preference

    // Display organic reduction description
    const organicReductionDescription = 'composting'; // Example, replace with actual technique based on user input
    const reductionInfo = dataset.organic_reduction[organicReductionDescription];
    document.getElementById('reductionDescription').innerHTML = `
        <p>${reductionInfo.description[userLanguage]}</p>
        <!-- Add steps and benefits here -->
    `;

    // Display manure making description
    const manureInfo = dataset.manure_making;
    document.getElementById('manureDescription').innerHTML = `
        <p>${manureInfo.description[userLanguage]}</p>
        <!-- Add steps here -->
    `;
}
