// Mock Data (Vehicle Listings)
const vehicles = [
    {
        id: 1,
        title: "Toyota Prius S Touring 2018",
        price: 8500000,
        category: "Sedan",
        make: "Toyota",
        year: 2018,
        mileage: 45000,
        fuel: "Hybrid",
        transmission: "Automatic",
        img: "https://images.unsplash.com/photo-1590362835106-1f67030a88bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
        description: "Excellent condition, first owner, full service history available."
    },
    {
        id: 2,
        title: "Honda Vezel RS Sensing 2019",
        price: 11000000,
        category: "SUV",
        make: "Honda",
        year: 2019,
        mileage: 38000,
        fuel: "Hybrid",
        transmission: "Automatic",
        img: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
        description: "RS Sensing, Gold Badge, imported brand new."
    },
    {
        id: 3,
        title: "Suzuki WagonR Stingray 2018",
        price: 5500000,
        category: "Hatchback",
        make: "Suzuki",
        year: 2018,
        mileage: 60000,
        fuel: "Hybrid",
        transmission: "Automatic",
        img: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
        description: "Safety package, HUD, push start, highest grade."
    },
    {
        id: 4,
        title: "Land Rover Defender 110 2021",
        price: 45000000,
        category: "SUV",
        make: "Land Rover",
        year: 2021,
        mileage: 15000,
        fuel: "Diesel",
        transmission: "Automatic",
        img: "https://images.unsplash.com/photo-1533473359331-0135ef1bcfb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
        description: "Brand new condition, permit holder vehicle."
    },
    {
        id: 5,
        title: "Toyota Hilux Revo Rocco 2022",
        price: 18500000,
        category: "SUV",
        make: "Toyota",
        year: 2022,
        mileage: 12000,
        fuel: "Diesel",
        transmission: "Automatic",
        img: "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
        description: "4x4, Rocco styling, leather interior, smart key."
    },
    {
        id: 6,
        title: "Yamaha MT-15 2023",
        price: 1200000,
        category: "Bike",
        make: "Yamaha",
        year: 2023,
        mileage: 5000,
        fuel: "Petrol",
        transmission: "Manual",
        img: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
        description: "Naked street fighter, pristine condition."
    },
    {
        id: 7,
        title: "Mercedes Benz C200 AMG Line",
        price: 22000000,
        category: "Sedan",
        make: "Mercedes",
        year: 2020,
        mileage: 28000,
        fuel: "Petrol",
        transmission: "Automatic",
        img: "https://images.unsplash.com/photo-1617788138017-80ad40651399?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
        description: "AMG Line, Night package, fully loaded."
    },
    {
        id: 8,
        title: "Nissan Leaf ZE1 2018",
        price: 6500000,
        category: "Hatchback",
        make: "Nissan",
        year: 2018,
        mileage: 55000,
        fuel: "Electric",
        transmission: "Automatic",
        img: "https://images.unsplash.com/photo-1593055357429-ca25972856c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
        description: "40kWh battery, ProPILOT, climate control."
    }
];

// Utility: Format Currency
const formatPrice = (price) => {
    return new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR' }).format(price);
};

// Render Listings Function
function renderVehicles(data, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';
    
    if (data.length === 0) {
        container.innerHTML = `<p style="text-align:center; grid-column:1/-1;">No vehicles found matching your criteria.</p>`;
        return;
    }

    data.forEach(vehicle => {
        const card = document.createElement('div');
        card.className = 'listing-card glass';
        card.innerHTML = `
            <div class="card-img-container">
                <img src="${vehicle.img}" alt="${vehicle.title}">
            </div>
            <div class="card-content">
                <div class="card-price">${formatPrice(vehicle.price)}</div>
                <h3 class="card-title">${vehicle.title}</h3>
                <div class="card-meta">
                    <span>${vehicle.year}</span>
                    <span>${vehicle.transmission}</span>
                    <span>${vehicle.fuel}</span>
                </div>
                <div class="card-btn">
                    <a href="details.html?id=${vehicle.id}" class="btn">View Details</a>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Filter Function
function applyFilters() {
    const keyword = document.getElementById('filter-keyword').value.toLowerCase();
    const type = document.getElementById('filter-type').value;
    const category = document.getElementById('filter-category').value;

    const filtered = vehicles.filter(v => {
        const matchKeyword = v.title.toLowerCase().includes(keyword) || v.make.toLowerCase().includes(keyword);
        const matchType = type === "" || v.transmission === type;
        const matchCategory = category === "" || v.category === category;
        return matchKeyword && matchType && matchCategory;
    });

    renderVehicles(filtered, 'listings-grid');
}

// Load Details Page Logic
function loadDetails(id) {
    const vehicle = vehicles.find(v => v.id == id);
    if (!vehicle) {
        document.body.innerHTML = "<h1>Vehicle Not Found</h1>";
        return;
    }

    document.getElementById('detail-title').innerText = vehicle.title;
    document.getElementById('detail-price').innerText = formatPrice(vehicle.price);
    document.getElementById('detail-img').src = vehicle.img;
    document.getElementById('detail-year').innerText = vehicle.year;
    document.getElementById('detail-mileage').innerText = vehicle.mileage.toLocaleString() + " km";
    document.getElementById('detail-fuel').innerText = vehicle.fuel;
    document.getElementById('detail-transmission').innerText = vehicle.transmission;
    document.getElementById('detail-desc').innerText = vehicle.description;
}

// Hero Search Function
function handleSearch() {
    const query = document.getElementById('hero-search').value;
    if(query) {
        // Redirect to buy page with query (mock behavior)
        window.location.href = `buy.html?q=${encodeURIComponent(query)}`;
    }
}

// Category Quick Filter (Home Page)
function filterCategory(cat) {
    window.location.href = `buy.html?cat=${encodeURIComponent(cat)}`;
}

// Initial Load Logic
document.addEventListener('DOMContentLoaded', () => {
    // Check which page we are on
    const path = window.location.pathname;
    
    // Featured Listings on Home Page
    if (path.includes('index.html') || path === '/' || path.endsWith('/')) {
        renderVehicles(vehicles.slice(0, 4), 'featured-grid'); // Show first 4
    }

    // Buy Page Logic
    if (path.includes('buy.html')) {
        // Parse URL params for pre-filling filters
        const urlParams = new URLSearchParams(window.location.search);
        const q = urlParams.get('q');
        const cat = urlParams.get('cat');

        if(q) document.getElementById('filter-keyword').value = q;
        if(cat) document.getElementById('filter-category').value = cat;

        applyFilters(); // Initial render
    }
});
