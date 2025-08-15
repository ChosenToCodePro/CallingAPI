const generatebtn = document.getElementById('generator');
const infodiv = document.getElementById('userinfo');

function load(count) {
    infodiv.innerHTML = ""
    const card = document.createElement('div');
    for (let i = 0; i < count; i++) {
            card.classList.add('card');

            card.innerHTML = `
            <div class="skeleton skeleton-pic"></div>
            <div class="skeleton skeleton-text" style="width: 40%"></div>
            <div class="skeleton skeleton-text" style="width: 60%; "></div>
            <div class="skeleton skeleton-text" style="width: 40%; "></div>`
        }

        infodiv.appendChild(card)
}

async function fetchdata(){
    try{

        load(3)

        const response = await fetch('https://randomuser.me/api/?results=3');
        const data = await response.json();

        infodiv.innerHTML = ""

        data.results.forEach(user => {
            const fn = user.name.first;
            const ln = user.name.last;
            const email = user.email;
            const city = user.location.city;
            const country = user.location.country;
            const pp = user.picture.large;
            const card = document.createElement('div');

            card.classList.add('card');
            card.innerHTML = `
                <img src="${pp}" class="pp" alt="" "><br>
                <strong>First Name: </strong> ${fn} <br>
                <strong>Last Name: </strong> ${ln} <br>
                <strong>Email: </strong> ${email} <br>
                <strong>City: </strong> ${city} <br>
                <strong>Country: </strong> ${country}
            `;

            infodiv.appendChild(card);
            console.log(fn, ln, email, city, country);
        });
    } catch (error){
        console.log("Error Fetching User",error);
        infodiv.innerHTML = "<span style='color: red;'>Failed to Fetch User Data</span>";
    }
}

generatebtn.addEventListener('click', fetchdata);