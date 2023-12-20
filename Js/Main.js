// site loader
const siteLoaderEl = document.querySelector('.site-loader');
const homeContent = document.querySelector('.home .container');
// header slider
const headerEl = document.getElementById('header');
const websiteLogoEl = document.querySelector('img.website-logo');
const parts = document.querySelectorAll('.part');
const menuItemsLink = document.querySelectorAll('.menu-item-link');
const homeEl = document.querySelector('.home');
// show menu
const menuHamburgerEl = document.querySelector('.menu-hamburger');
const menuEl = document.querySelector('.menu');
const menuHamburgerIcon = document.querySelector('.icon-menu');
// home background
const bgSlide = document.querySelector('.bg-slide');
// background attachment custom
const bgAttachments = document.querySelectorAll('.bg-attachment');
// show element
const showElementsScale = document.querySelectorAll('.show-scale');
const showElementsPosition = document.querySelectorAll('.show-position');
// show element delay
const galleryImgs = document.querySelectorAll('.gallery-img');
// modal
const modalEl = document.querySelector('.modal');
const modalChilds = document.querySelectorAll('.modal > :nth-child(n)');
const modalImgEl = document.querySelector('.modal-img');
const modalBtnClose = document.querySelector('.modal-btn-close');
const modalBtnPerv = document.querySelector('.modal-btn-perv');
const modalBtnNext = document.querySelector('.modal-btn-next');
const imgName = document.getElementById('img-name');
const imgNum = document.getElementById('img-num');
// form
const forms = document.querySelectorAll('form');
const inputDateEl = document.querySelector('input[type="date"]');
const hotspots = document.querySelectorAll('.hotspot');
const tableEl = document.getElementById('table');
// map
const staticMap = document.querySelector('.static-map');
const googleMap = document.querySelector('.google-map');
const mapBtn = document.querySelector('.map-btn');
const mapLoader = document.querySelector('.map-loader');
// scroll up page show
const scrollUpEl = document.querySelector('.scroll-up-page');

// site loader
document.onreadystatechange = () => {
    if (document.readyState === "complete") {
        // home background
        const backgrounds = ['Burger-Large.jpg','Coffee-Large.jpg','Fruit-Large.jpg','Pasta-Large.jpg'];

        let num = 0;
        bgSlide.style.backgroundImage = `url(Images/${backgrounds[num]})`;

        setInterval(() => {
            num++;
            if (num > backgrounds.length - 1) {
                num = 0;
            }

            bgSlide.style.backgroundImage = `url(Images/${backgrounds[num]}) , url(Images/${backgrounds[num < backgrounds.length - 1 ? num + 1 : num]})`;
        },5000);

        siteLoaderEl.style.opacity = "0";
        siteLoaderEl.style.visibility = "hidden";
        homeContent.style.display = 'flex';
    }
};

// header set min-width:768
const headerFix = () => {
    window.addEventListener('scroll',() => {
        // debug headerSlide
        headerEl.style.top = '0';

        // menu item target
        for (const part of parts) {
            if (part.getBoundingClientRect().top - headerEl.offsetHeight <= 0) {
                for (const menuItemLink of menuItemsLink) {
                    if (menuItemLink.getAttribute('href').includes(part.id)) {
                        menuItemLink.classList.add('current');
                    } else {
                        menuItemLink.classList.remove('current');
                    }
                }
            }
        }
        // change slider
        if (window.scrollY - headerEl.offsetHeight >= 0) {
            headerEl.classList.add('header-secondary');
            websiteLogoEl.setAttribute('src','Images/Website-Logo.png');
        } else {
            headerEl.classList.remove('header-secondary');
            websiteLogoEl.setAttribute('src','Images/Website-Logo-White.png');
        }
    });
};
// header set max-width:768
const headerSlide = () => {
    let primaryScroll = window.scrollY;
    
    window.addEventListener('scroll',() => {
        // debug headerFix
        headerEl.classList.remove('header-secondary');

        const scrollNow = window.scrollY;
    
        if (scrollNow >= homeEl.offsetHeight - headerEl.offsetHeight) {
            if (scrollNow >= primaryScroll) {
                headerEl.style.top = `-${headerEl.offsetHeight}px`;
            } else {
                headerEl.style.top = '0';
            }

            primaryScroll = scrollNow;
        }

        // debug
        if (menuEl.classList.contains('show-menu')) {
            headerEl.style.top = '0';
        }
    });
};
// by responsive
if (window.innerWidth > 768) {
    headerFix();
} else if (window.innerWidth <= 768) {
    headerSlide();
}
// by resize
window.addEventListener('resize',() => {
    if (window.innerWidth > 768) {
        headerFix();
    }
    if (window.innerWidth <= 768) {
        headerSlide();
    }
});

// show menu
const showMenu = element => {
    element.addEventListener('click',() => {
        menuEl.classList.toggle('show-menu');
        // change menu hamburger icon
        menuHamburgerIcon.classList.toggle('icon-close');
    });
};
showMenu(menuHamburgerEl);
showMenu(menuEl);

// background attachment custom
window.addEventListener('scroll',() => {
    let num = 0;
    
    for (const bgAttachment of bgAttachments) {
        if (bgAttachment.parentElement.getBoundingClientRect().top <= window.innerHeight && bgAttachment.parentElement.getBoundingClientRect().bottom >= 0 ) {
            let numScroll = Math.round(window.scrollY) - bgAttachment.parentElement.offsetTop - bgAttachment.parentElement.getBoundingClientRect().top;
            num = numScroll / 10;
        }

        bgAttachment.style.transform=`matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, ${num}, 0, 1)`;
    }
});

// show element scale/position
const show = (element,className)=>{
    for (const showElement of element) {
        showElement.classList.add(className);
        window.addEventListener('scroll',() => {
            if (showElement.parentElement.getBoundingClientRect().top <= window.innerHeight) {
                showElement.style.display = 'initial';
            }
        });
    }
};
show(showElementsScale,'show-scale');
show(showElementsPosition,'show-position');

// show element delay
for (let num = 0; num < galleryImgs.length;) {
    num++;

    const galleryImg = document.querySelector(`.parent-img:nth-child(${num}) .gallery-img`);

    galleryImg.style.animationDelay = `0.${num}s`;
}

// modal
galleryImgs.forEach((galleryImg,index)=>{
    // show img
    const showImg = (target , interval)=>{
        modalImgEl.style.opacity = '0';
        imgName.style.opacity = '0';
        setTimeout(() => {
            modalImgEl.setAttribute('src',target.getAttribute('src'));
            modalImgEl.setAttribute('alt',target.getAttribute('alt'));

            modalImgEl.style.opacity = '1';
            imgName.style.opacity = '1';

            imgName.textContent = imgName.textContent = target.getAttribute('alt');
            imgNum.textContent = `${index+1} / ${galleryImgs.length}`;
        },interval);
    };

    // perv img
    const pervImg = () => {
        index--;
        if (index < 0) {
            index = galleryImgs.length - 1;
        }

        showImg(galleryImgs[index],300);
    };

    // next img
    const nextImg = () => {
        index++;
        if (index >= galleryImgs.length) {
            index = 0;
        }

        showImg(galleryImgs[index],300);
    };

    galleryImg.addEventListener('click',() => {
        // show modal
        modalEl.classList.add('show-modal');
        showImg(galleryImg,0);
        
        // chang img
        modalBtnPerv.addEventListener('click',() => {
            pervImg();
        });
        modalBtnNext.addEventListener('click',() => {
            nextImg();
        });

        // keyboard
        window.addEventListener('keyup',(e)=>{
            e.key === 'Escape' ? hideModal() : false;
            e.key === 'ArrowRight' ? nextImg() : false;
            e.key === 'ArrowLeft' ? pervImg() : false;
        });
    });
});
// hide modal
const hideModal = () => {
    modalEl.classList.remove('show-modal');
    modalBtnClose.style.transform = 'rotate(180deg)';
    setTimeout(() => {
        modalBtnClose.style.transform = 'rotate(0deg)';
    },400);
};
modalEl.addEventListener('click',() => {
    hideModal();
});
modalBtnClose.addEventListener('click',() => {
    hideModal();
});
// debug stop hide modal
for (const modalChildEl of modalChilds) {
    modalChildEl.addEventListener('click',(e)=>{
        e.stopPropagation();
    });
}

// form
for (const formEl of forms) {
    formEl.addEventListener('submit',(e)=>{
        e.preventDefault();
    });
}
// date value dynamic
let day = new Date().getDate();
let month = new Date().getMonth() + 1;
const year = new Date().getFullYear();
day < 10 ? day = '0' + day : false;
month < 10 ? month = '0' + month : false;
inputDateEl.value = `${year}-${month}-${day}`;
// table value dynamic
for (const hotspotEl of hotspots) {
    hotspotEl.addEventListener('click',() => {
        tableEl.value = hotspotEl.dataset.table;
    });
}

// map
staticMap.addEventListener('click',() => {
    mapLoader.style.display = 'flex';
    googleMap.style.display = 'block';
    googleMap.setAttribute('src','https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d11788.509602327886!2d-83.13881887736748!3d42.38243241489823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1681799289743!5m2!1sen!2sus');
    mapBtn.style.display = 'block';
});
mapBtn.addEventListener('click',() => {
    googleMap.style.display = 'none';
    mapBtn.style.display = 'none';
    mapLoader.style.display = 'none';
});

// scroll up page show
scrollUpEl.style.display = 'none';
window.addEventListener('scroll',() => {
    if (homeEl.getBoundingClientRect().bottom - headerEl.offsetHeight >= 0) {
        scrollUpEl.style.display = 'block';
        scrollUpEl.classList.add('scroll-up-hide');
    } else {
        scrollUpEl.style.display = 'block';
        scrollUpEl.classList.remove('scroll-up-hide');
    }
});