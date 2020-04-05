export class FillerNav {
    constructor() {
        return new Object({
            routes: [
                { name: 'Início', isActive: true, path: 'home', img: '../../assets/imgs/logo.png' },
                { name: 'Perfil', isActive: false, path: 'profile', img: '../../assets/svg/profile.svg' },
                { name: 'My Issues', isActive: false, path: 'my-stuff', img: '../../assets/svg/profile.svg' },
            ]
        });
    }
}