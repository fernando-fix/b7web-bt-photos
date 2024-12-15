class SkeletonLoader {
    constructor() {
        // A 1px light gray square
        this.placeholderSrc = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiPjxzdmcgZmlsbD0iI2UwZTBjMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIvPjwvc3ZnPg==';
        this.init();
    }

    init() {
        // Seleciona todas as imagens com a classe "skeleton"
        const skeletonImages = document.querySelectorAll('img.skeleton');
        skeletonImages.forEach((img) => this.applySkeletonEffect(img));
    }

    applySkeletonEffect(img) {
        // Salva o src original e define o placeholder
        const originalSrc = img.src;
        img.src = this.placeholderSrc;

        // Cria um contêiner para a imagem
        const wrapper = document.createElement('div');
        wrapper.classList.add('skeleton-wrapper');
        wrapper.style.position = 'relative';
        wrapper.style.overflow = 'hidden';
        wrapper.style.display = 'inline-block';

        // Cria o efeito shimmer
        const shimmer = document.createElement('div');
        shimmer.classList.add('skeleton-shimmer');
        shimmer.style.position = 'absolute';
        shimmer.style.top = '0';
        shimmer.style.left = '0';
        shimmer.style.width = '100%';
        shimmer.style.height = '100%';
        shimmer.style.background =
            'linear-gradient(90deg, rgba(224, 224, 224, 0) 0%, rgba(200, 200, 200, 0.5) 50%, rgba(224, 224, 224, 0) 100%)';
        shimmer.style.animation = 'skeleton-shimmer 1.5s infinite';

        // Insere o wrapper e os elementos no DOM
        img.parentNode.insertBefore(wrapper, img);
        wrapper.appendChild(img);
        wrapper.appendChild(shimmer);

        // Substitui o placeholder pelo src original quando a imagem for carregada
        let timer = null;
        img.addEventListener('load', () => {
            if (img.src === this.placeholderSrc) {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    img.src = originalSrc;
                }, 1000);
            } else {
                wrapper.classList.add('loaded');
                shimmer.remove();
            }
        });

        // Define a opacidade inicial para a imagem
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';

        // Mostra a imagem ao carregar
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
    }
}

// Adiciona a animação no CSS automaticamente
const style = document.createElement('style');
style.textContent = `
    @keyframes skeleton-shimmer {
        0% {
            transform: translateX(-100%);
        }
        100% {
            transform: translateX(100%);
        }
    }

    .skeleton-wrapper {
        background: #e0e0e0;
    }

    .skeleton-wrapper.loaded {
        background: none;
    }
`;
document.head.appendChild(style);

// Inicializa o SkeletonLoader automaticamente
window.addEventListener('DOMContentLoaded', () => new SkeletonLoader());
