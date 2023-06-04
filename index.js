const listas = document.getElementById('listas')
const resultado = document.querySelector('.num1')

document.addEventListener('DOMContentLoaded', e => {
    fetchData()
})


const fetchData = async () => {
    try {
        const res = await fetch('./data.json')
        const data = await res.json()

        // console.log(data)
        exame(data)

    } catch (error) {
        console.log(error)
    }
}


const exame = data => {
    data.forEach(({ icon, category, score }) => {
        
        const div = document.createElement('div')
        const div1 = document.createElement('div')
        const div2 = document.createElement('div')

        
        const img = document.createElement('img')
        const nameCategory = document.createElement('h3')
        const numberScore = document.createElement('p')

        
        div.setAttribute('class', 'item')
        div1.setAttribute('id', 'icons')
        div2.setAttribute('id', 'span')

        
        div.style.setProperty('--category-color', getBgColor(category))
        div.style.setProperty('--txt-color', getTxtColor(category))

        
        img.setAttribute('src', icon)
        nameCategory.innerHTML = `${category}`
        numberScore.textContent = `${score}`

        
        div1.append(img, nameCategory)
        div2.append(numberScore, "/ 100")
        div.append(div1, div2)

        
        listas.append(div)
    })

    // para mostrar a média dos exames
    let result = 0
    let sum = 0
    data.forEach(soma => sum += soma.score)
    result = sum / data.length
    resultado.innerHTML = `${result.toFixed(0)}`
}


// constante com as cores do background
const getBgColor = category => {
    const normal = '#DEFDE0';
    return {
        Reaction: '#FFF6F5',
        Memory: '#fffded',
        Verbal: '#F2FBFA',
        Visual: '#F3F3FD',
    }[category] || normal
}

// constante com as cores do texto
const getTxtColor = category => {
    const normal = '#DEFDE0';
    return {
        Reaction: 'hsl(0, 100%, 67%)',
        Memory: 'hsl(39, 100%, 56%)',
        Verbal: 'hsl(166, 100%, 37%)',
        Visual: 'hsl(234, 85%, 45%)',
    }[category] || normal
}

