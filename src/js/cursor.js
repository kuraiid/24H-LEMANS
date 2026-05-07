
let mouseX, mouseY, posX, posY

document.addEventListener('DOMContentLoaded', () => {

    const body = document.querySelector('body')

    const cursor   = document.getElementById('cursor'),
          follower = document.getElementById('aura'),
          links    = document.getElementsByTagName('a')

    mouseX = 0, mouseY = 0, posX = 0, posY = 0

    function mouseCoords(e) {
        mouseX = e.pageX
        mouseY = e.pageY
    }

    body.addEventListener('mousemove', e => {
        mouseCoords(e)
        cursor.classList.remove('hidden')
        follower.classList.remove('hidden')
    })

    gsap.to({}, .01, {
        repeat: -1,
        onRepeat: () => {
            posX += (mouseX - posX) / 5
            posY += (mouseY - posY) / 5

            gsap.set(cursor, {
                css: {
                    left: mouseX,
                    top: mouseY
                }
            })

            gsap.set(follower, {
                css: {
                    left: posX - 24,
                    top: posY - 24
                }
            })
        }
    })

    for (let i = 0; i < links.length; i++) {
        links[i].addEventListener('mouseover', () => {
            cursor.classList.add('active')
            follower.classList.add('active')
        })
        links[i].addEventListener('mouseout', () => {
            cursor.classList.remove('active')
            follower.classList.remove('active')
        })
    }

    body.addEventListener('mouseout', () => {
        cursor.classList.add('hidden')
        follower.classList.add('hidden')
    })

})