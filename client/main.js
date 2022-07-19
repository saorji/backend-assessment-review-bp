const complimentBtn = document.getElementById("complimentButton")
const goalCategory = document.getElementById("goal-category")
const displaySection = document.getElementById("display-section")
const categoryBtn = document.getElementById("category-submit")
const postAdviceBtn = document.getElementById("add-advice-btn")
const categoryInput = document.getElementById("add-category")
const adviceInput = document.getElementById("add-advice")
const deleteCatinput = document.getElementById("delete-category-input")
const deleteCatBtn = document.getElementById("delete-category-btn")

const baseURL = `http://localhost:4000/api`

const getCompliment = () => {
    axios.get(`${baseURL}/compliment/`)
        .then(res => {
            const data = res.data;
            alert(data);
    });
};

const displayAdvice = (advice) => {
    const showAdvice = document.createElement("h3")
        showAdvice.textContent = advice
        displaySection.appendChild(showAdvice)
}

const getAdviceHandler = () => {
    displaySection.innerHTML = ``
    axios.get(`${baseURL}/goal/advice?category=${goalCategory.value}`)
    .then(res => {
        console.log(res.data)
        displayAdvice(res.data.advice)
    })
    .catch(err => console.log(err))
}

const postAdviceHandler = () => {
    const body = {
        category:categoryInput.value,
        advice:adviceInput.value
    }
    axios.post(`${baseURL}/goal/advice`,body)
    .then(res => {
        console.log(res.data)
        categoryInput.value = ``
        adviceInput.value = ``
        displayAdvice(res.data.advice)
        const newOption = document.createElement('option')
        newOption.textContent = res.data.category
        newOption.value = res.data.category.toLowerCase()
        goalCategory.appendChild(newOption)
    })
    .catch(err => console.log(err))
}

const deleteCatHandler = () => {
    const params = deleteCatinput.value.toLowerCase()
    axios.delete(`${baseURL}/goal/${params}`)
    .then(res => {
        displaySection.innerHTML = ``
        alert(res.data)
    })
    .catch(err => console.log(err))
}

complimentBtn.addEventListener('click', getCompliment)

categoryBtn.addEventListener("click",getAdviceHandler)

postAdviceBtn.addEventListener("click",postAdviceHandler)

deleteCatBtn.addEventListener("click",deleteCatHandler)