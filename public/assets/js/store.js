const StoreCart = {
    items: [],
    whatsappNumber: "5511999999999", // Aqui o dono configura o número dele

    init() {
        // Tenta recuperar carrinho salvo no navegador
        const saved = localStorage.getItem('mafe_kids_cart');
        if (saved) {
            try {
                this.items = JSON.parse(saved);
            } catch(e) {}
        }
        this.render();
    },

    save() {
        localStorage.setItem('mafe_kids_cart', JSON.stringify(this.items));
        this.render();
    },

    addItem(id, name, price) {
        const existing = this.items.find(x => x.id === id);
        if (existing) {
            existing.qty += 1;
        } else {
            this.items.push({ id, name, price, qty: 1 });
        }
        
        this.save();
        
        Swal.fire({
            toast: true,
            position: 'bottom-end',
            icon: 'success',
            title: 'Adicionado à sacola!',
            showConfirmButton: false,
            timer: 2000
        });

        // Abre o offcanvas do carrinho automaticamente
        const offcanvas = new bootstrap.Offcanvas(document.getElementById('cartOffcanvas'));
        offcanvas.show();
    },

    changeQty(id, delta) {
        const item = this.items.find(x => x.id === id);
        if (item) {
            item.qty += delta;
            if (item.qty <= 0) {
                this.items = this.items.filter(x => x.id !== id);
            }
            this.save();
        }
    },

    render() {
        // Atualiza a bolinha vermelha no ícone da navbar
        const totalItems = this.items.reduce((sum, item) => sum + item.qty, 0);
        document.getElementById('cartBadgeCount').innerText = totalItems;

        const container = document.getElementById('storeCartItems');
        container.innerHTML = '';

        if (this.items.length === 0) {
            container.innerHTML = `
                <div class="text-center text-muted mt-5">
                    <i class="fa-solid fa-face-frown fs-1 mb-3 opacity-25"></i>
                    <h6>Sua sacola está vazia</h6>
                    <p class="small">Adicione algumas roupinhas fofas!</p>
                </div>
            `;
            document.getElementById('storeCartTotal').innerText = 'R$ 0,00';
            return;
        }

        let totalAmount = 0;

        this.items.forEach(item => {
            const subtotal = item.qty * item.price;
            totalAmount += subtotal;

            const div = document.createElement('div');
            div.className = 'cart-item-row';
            div.innerHTML = `
                <div class="cart-item-info flex-grow-1 me-3">
                    <h6>${item.name}</h6>
                    <div class="d-flex align-items-center mt-2">
                        <div class="input-group input-group-sm me-3" style="width: 90px;">
                            <button class="btn btn-outline-secondary" onclick="StoreCart.changeQty(${item.id}, -1)">-</button>
                            <input type="text" class="form-control text-center px-0 fw-bold" value="${item.qty}" readonly>
                            <button class="btn btn-outline-secondary" onclick="StoreCart.changeQty(${item.id}, 1)">+</button>
                        </div>
                        <small class="fw-bold text-primary">R$ ${subtotal.toFixed(2).replace('.', ',')}</small>
                    </div>
                </div>
                <button class="btn-remove" onclick="StoreCart.changeQty(${item.id}, -9999)" title="Remover">
                    <i class="fa-solid fa-trash"></i>
                </button>
            `;
            container.appendChild(div);
        });

        document.getElementById('storeCartTotal').innerText = `R$ ${totalAmount.toFixed(2).replace('.', ',')}`;
    },

    checkoutWhatsapp() {
        if (this.items.length === 0) {
            Swal.fire('Opa!', 'Sua sacola está vazia.', 'warning');
            return;
        }

        let totalAmount = 0;
        let text = "Olá MaFê Kids! 🎀\nGostaria de fazer o seguinte pedido:\n\n";

        this.items.forEach(item => {
            const subtotal = item.qty * item.price;
            totalAmount += subtotal;
            text += `👉 ${item.qty}x ${item.name} - R$ ${subtotal.toFixed(2).replace('.', ',')}\n`;
        });

        text += `\n*TOTAL:* R$ ${totalAmount.toFixed(2).replace('.', ',')}\n\n`;
        text += "Como podemos combinar o pagamento e a entrega?";

        const encodedText = encodeURIComponent(text);
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${this.whatsappNumber}&text=${encodedText}`;

        // Limpa o carrinho após enviar
        this.items = [];
        this.save();

        window.open(whatsappUrl, '_blank');
        
        // Fecha o offcanvas
        const offcanvas = bootstrap.Offcanvas.getInstance(document.getElementById('cartOffcanvas'));
        if (offcanvas) offcanvas.hide();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    StoreCart.init();
});
