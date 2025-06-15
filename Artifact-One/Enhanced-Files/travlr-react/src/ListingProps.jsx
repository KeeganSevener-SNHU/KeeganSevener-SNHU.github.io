// This JSON file is the test data that will seed the database in Category Three.
// For now, it is used here to help showcase the interface for Category One

/* References
photo references cited in APA format.

reef1
Li, E. (2020, August 21). Person Swimming with a Manta Ray. Pexels. 
    https://www.pexels.com/photo/person-swimming-with-a-manta-ray-5159137/

reef2
Rom, J. C. (2019, August 9). Woman Swimming Underwater. Pexels. 
    https://www.pexels.com/photo/woman-swimming-underwater-2121320/ 

reef3
Galante, R. (2020, July 5). Man in Black Wet Suit Under Water near Black and White Fish. Pexels. 
    https://www.pexels.com/photo/man-in-black-wet-suit-under-water-near-black-and-white-fish-4809019/ 

reef4
Ungaro, F. (2019, November 30). Photo of Sea Animals Near Coral Reef. Pexels. 
    https://www.pexels.com/photo/shoal-of-sergeant-major-17681780/

reef5
Rom, J. C. (2018, March 30). Underwater Photography Photos, download the Best Free Underwater Photography Stock Photos & 
    HD Images. Pexels. https://www.pexels.com/photo/underwater-photography-of-person-3041867/ 

reef6
Mango, M. (2022, March 14). Scuba Diver Swimming with Fish Underwater. Pexels.
     https://www.pexels.com/photo/scuba-diver-swimming-with-fish-underwater-11481772/ 

reef7
Cayamo, G. (2019, May 16). Photography of Person Swimming Under Water. Pexels. 
    https://www.pexels.com/photo/photography-of-person-swimming-under-water-2324662/ 

reef8
Passo, P. (2022, January 6). A Woman in Green Wetsuit. Pexels. 
    https://www.pexels.com/photo/a-woman-in-green-wetsuit-10769610/

reef9
Özel, M. (2024, September 24). Scuba Diver Exploring Vibrant Coral Reef. Pexels. 
    https://www.pexels.com/photo/scuba-diver-exploring-vibrant-coral-reef-28584677/

reef10
Fisk, T. (2020, June 9). Divers Swimming Over the Corals. Pexels. 
    https://www.pexels.com/photo/divers-swimming-over-the-corals-4610201/

reef11
Ungaro, F. (2019, November 3). School of Fish in Ocean. Pexels. 
    https://www.pexels.com/photo/school-of-fish-in-ocean-3172278/

reef12
Ungaro, F. (2019, November 6). School of Fish in Water. Pexels. 
    https://www.pexels.com/photo/school-of-fish-in-water-3189106/

reef13
Rom, J. C. (2019, April 19). Woman in Body of Water. Pexels. 
    https://www.pexels.com/photo/school-of-fish-in-water-3189106/

reef14
Media, K. (2021, July 21). Person in Black Wetsuit Diving on Water. Pexels. 
    https://www.pexels.com/photo/person-in-black-wetsuit-diving-on-water-8849654/

reef15
Ungaro, F. (2023, July 21). Red and Black Anemonefish Swimming among Corals and Anemone. Pexels. 
    https://www.pexels.com/photo/person-in-black-wetsuit-diving-on-water-8849654/

reef16
Ungaro, F. (2023, July 21). Shoal of Sergeant Major. Pexels. 
    https://www.pexels.com/photo/shoal-of-sergeant-major-17681780/ 
*/

const jsonObject = [
    {
        "id": "1",
        "sku" : "reefSKU1",
        "price" : "1999.00",
        "title": "Drift Through the Gardens of Raja Ampat, Indonesia",
        "descrip" : " Drift through Raja Ampat’s remote reefs, alive with dazzling corals, manta rays, and rare marine life in the world’s richest underwater ecosystem.",
        "description":" Explore the heart of marine biodiversity in Raja Ampat, where coral gardens teem with rare species. Drift diving through crystal-clear waters, you'll encounter vibrant soft corals, manta rays, and pygmy seahorses in a remote, untouched paradise.",
        "date" : "March 14 – March 20, 2026",
        "image": "reef1",
        "range": "6 Days / 7 Nights",
        "amenity" : ["Yes","Yes","Yes","Yes","No","Yes",]
    },
    {
        "id": "2",
        "sku" : "reefSKU2",
        "price" : "999.00",
        "title": "Explore the Vibrant Coral Walls of Cozumel, Mexico",
        "descrip":"  Dive Cozumel’s famous walls where vivid coral, sponges, and fast currents attract a swirl of tropical fish and pelagic visitors.",
        "description" :" Cozumel offers stunning wall dives with dramatic drop-offs and swift currents. Marvel at colorful coral formations, sponges, and the rich marine life of the Mesoamerican Barrier Reef—the second-largest in the world.",
        "image": "reef2",
        "date" : "September 17 - September 21, 2026",
        "range": "4 Days / 5 Nights",
        "amenity" : ["Yes","Yes","Yes","Yes","No","Yes",]
    },
    {
        "id": "3",
        "title": "Dive the Pristine Reefs of Taveuni, Fiji",
        "price" : "1199.00",
        "sku" : "reefSKU3",
        "descrip" : " Immerse yourself in Fiji’s Rainbow Reef, where soft corals paint the seafloor and marine life thrives in warm, clear waters.",
        "description":" Known as the 'Soft Coral Capital of the World,' Taveuni’s Rainbow Reef dazzles with vibrant hues and exceptional clarity. Expect barracuda, reef sharks, and swirling schools of fish in this warm South Pacific haven.",
        "image": "reef3",
        "date" : "August 3 – August 10, 2026",
        "range": "7 Days / 8 Nights",
        "amenity" : ["Yes","Yes","Yes","Yes","No","Yes",]
    },
    {
        "id": "4",
        "title": "Uncover the Hidden Coral Caves of Wakatobi, Indonesia",
        "price" : "1299.00",
        "sku" : "reefSKU4",
        "descrip" : " Wakatobi’s protected reefs offer coral-covered caves, pristine visibility, and biodiversity perfect for calm, stunning dives.",
        "description":" Wakatobi is a diver’s dream with thriving coral gardens, overhangs, and tunnels. Its protected status ensures near-perfect visibility and lush coral growth, making it ideal for underwater photography and relaxed exploration.",
        "image": "reef4",
        "date" : "December 2 – December 7, 2026",
        "range": "5 Days / 6 Nights",
        "amenity" : ["Yes","Yes","Yes","Yes","No","Yes",]
    },
    {
        "id": "5",
        "title": "Swim Among Giants at the Great Barrier Reef, Australia",
        "price" : "899.00",
        "sku" : "reefSKU5",
        "descrip" : " Explore the vast Great Barrier Reef with its towering bommies, sea turtles, reef sharks, and legendary coral formations.",
        "description":" The world’s largest coral reef system offers legendary dives with sea turtles, rays, and reef sharks. Explore vibrant bommies and sprawling coral expanses stretching as far as the eye can see.",
        "image": "reef5",
        "date" : "May 18 – May 25, 2026",
        "range": "7 Days / 8 Nights",
        "amenity" : ["No","No","Yes","Yes","No","Yes",]
    },
    {
        "id": "6",
        "title": "Snorkel the Shallow Reefs of Belize’s Hol Chan Marine Reserve",
        "price" : "1499.00",
        "sku" : "reefSKU6",
        "descrip" : " Enjoy easy access to vibrant coral canyons filled with nurse sharks, rays, and tropical fish in calm Caribbean waters.",
        "description":" Ideal for snorkelers and divers alike, Hol Chan showcases coral canyons, nurse sharks, and stingrays. Its shallow, protected waters make it one of the best accessible reef experiences in the Caribbean.",
        "image": "reef6",
        "date" : "October 22 – October 29, 2026",
        "range": "7 Days / 8 Nights",
        "amenity" : ["No","Yes","Yes","Yes","Yes","Yes",]
    },
    {
        "id": "7",
        "title": "Experience the Color Explosion at Bunaken, Sulawesi",
        "price" : "599.00",
        "sku" : "reefSKU7",
        "descrip" : " Bunaken’s dramatic reef walls deliver a feast of coral color, macro critters, and pelagic surprises for experienced divers.",
        "description":"  Bunaken’s vertical reef walls are a burst of life, with hundreds of coral species and reef fish. Strong currents attract pelagics and keep visibility high, making it a must for macro and big fish lovers alike.",
        "image": "reef7",
        "date" : "February 5 – February 10, 2026",
        "range": "5 Days / 6 Nights",
        "amenity" : ["No","Yes","Yes","Yes","No","Yes",]
    },
    {
        "id": "8",
        "title": "Glide Over the Coral Plateaus of the Red Sea, Egypt",
        "price" : "979.00",
        "sku" : "reefSKU8",
        "descrip" : " The Red Sea’s wide coral plateaus host dazzling reef fish, warm waters, and world-class underwater scenery.",
        "description":" The Red Sea’s coral plateaus feature stunning diversity and surreal underwater landscapes. Dive with anthias, moray eels, and occasional dolphins amid warm, turquoise waters and dazzling coral structures.",
        "image": "reef8",
        "date" : "July 17 – July 23, 2026",
        "range": "6 Days / 7 Nights",
        "amenity" : ["Yes","Yes","Yes","Yes","No","Yes",]
    },
    {
        "id": "9",
        "title": "Journey to the Remote Reefs of Kimbe Bay, Papua New Guinea",
        "price" : "479.00",
        "sku" : "reefSKU9",
        "descrip" : " Dive into an untouched coral frontier where sea fans, reef fish, and rare species thrive in near-perfect conditions.",
        "description":" Home to over 60% of the Indo-Pacific’s coral species, Kimbe Bay is an untouched underwater wilderness. Dive into a kaleidoscope of corals, sea fans, and an abundance of reef fish and nudibranchs.",
        "image": "reef9",
        "date" : "November 4 – November 9, 2026",
        "range": "5 Days / 6 Nights",
        "amenity" : ["No","No","No","Yes","No","Yes",]
    },
    {
        "id": "10",
        "title": "Explore the Coral Labyrinths of the Maldives Atolls",
        "price" : "1765.00",
        "sku" : "reefSKU10",
        "descrip" : "Navigate underwater tunnels and coral thilas while spotting mantas, whale sharks, and brilliant reef life.",
        "description":" The Maldives offers intricate reef systems and pinnacles called “thilas.” Glide through tunnels and overhangs while spotting manta rays, whale sharks, and spectacular coral growth in the Indian Ocean’s warm embrace.",
        "image": "reef10",
        "date" : "April 2 – April 6, 2026",
        "range": "4 Days / 5 Nights",
        "amenity" : ["No","No","Yes","Yes","No","Yes",]
    },
    {
        "id": "11",
        "title": "Discover the Marine Biodiversity of Apo Reef, Philippines",
        "price" : "1097.00",
        "sku" : "reefSKU11",
        "descrip" : "Apo Reef’s dramatic walls and slopes are alive with hard corals, turtles, and pelagic life in crystal-clear waters.",
        "description":" Apo Reef, the largest atoll-like reef in the Philippines, is rich with hard corals and pelagic life. Dive deep walls and coral slopes while encountering turtles, jacks, and the occasional reef shark.",
        "image": "reef11",
        "date" : "December 22 – December 26, 2026",
        "range": "4 Days / 5 Nights",
        "amenity" : ["Yes","Yes","Yes", "Yes","Yes","Yes",]
    },
    {
        "id": "12",
        "title": "Float Above the Soft Corals of Kadavu, Fiji",
        "price" : "609.00",
        "sku" : "reefSKU12",
        "descrip" : "Escape to Kadavu’s colorful reefs and manta cleaning stations in one of Fiji’s most peaceful dive settings.",
        "description":" Kadavu’s Great Astrolabe Reef is a lesser-known gem with lush soft coral gardens, manta cleaning stations, and low diver traffic. Perfect for those seeking vibrant reefs away from the crowds.",
        "image": "reef12",
        "date" : "January 10 – January 16, 2026",
        "range": "6 Days / 7 Nights",
        "amenity" : ["No","Yes","Yes","Yes","No","Yes",]
    },
    {
        "id": "13",
        "title": "Dive into the Technicolor Coral Slopes of Palau",
        "price" : "705.00",
        "sku" : "reefSKU13",
        "descrip" : "Palau’s underwater world boasts blue holes, coral gardens, and big fish action in thrilling dive conditions.",
        "description":" Palau’s reefs are a vivid mix of coral gardens, drop-offs, and blue holes. Expect strong currents, big fish action, and a variety of soft and hard corals—an adrenaline-filled dive playground.",
        "image": "reef13",
        "date" : "September 9 – September 14, 2026",
        "range": "5 Days / 6 Nights",
        "amenity" : ["Yes","No","No","Yes","Yes","Yes",]
    },
    {
        "id": "14",
        "title": "Encounter Coral-Covered Wrecks in the Florida Keys, USA",
        "price" : "384.00",
        "sku" : "reefSKU14",
        "descrip" : "Explore historic wrecks and lively coral reefs in warm, shallow waters ideal for all levels of divers.",
        "description":"The Florida Keys combine coral reefs with historic shipwrecks. Explore the 'Wreck Trek' while enjoying vibrant coral encrustations, tropical fish, and accessible dive conditions for all skill levels.",
        "image": "reef14",
        "date" : "January 10 – January 16, 2026",
        "range": "6 Days / 7 Nights",
        "amenity" : ["Yes","Yes","Yes","Yes","Yes","Yes",]
    },
    {
        "id": "15",
        "title": "Wade Through the Coral Gardens of Moorea, French Polynesia",
        "price" : "765.00",
        "sku" : "reefSKU15",
        "descrip" : "Moorea’s calm lagoons offer easy access to blooming coral gardens filled with rays and reef fish.",
        "description":" Moorea’s calm lagoons are ideal for snorkelers and new divers. Shallow reefs full of hard corals, butterflyfish, and rays await just offshore in warm, turquoise water backed by volcanic peaks.",
        "image": "reef15",
        "date" : "June 7 – June 13, 2026",
        "range": "6 Days / 7 Nights",
        "amenity" : ["Yes","Yes","No","Yes","No","Yes",]
    },
    {
        "id": "16",
        "title": "Venture to the Untouched Reefs of Mafia Island, Tanzania",
        "price" : "1259.00",
        "sku" : "reefSKU16",
        "descrip" : "Discover Mafia Island’s quiet, colorful reefs and seasonal whale shark encounters in a remote marine park.",
        "description":" Part of a marine park, Mafia Island boasts thriving coral reefs and calm, warm waters. Its off-the-beaten-path feel offers pristine dive conditions, colorful coral structures, and encounters with whale sharks (seasonal).",
        "image": "reef16",
        "date" : "October 1 – October 6, 2026",
        "range": "5 Days / 6 Nights",
        "amenity" : ["No","Yes","Yes","Yes","No","Yes",]
    }

    
]

export default jsonObject