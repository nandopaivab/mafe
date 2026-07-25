const PdvManager = {
    cart: [],
    paymentMethod: 'dinheiro',

    init() {
        this.updateClock();
        setInterval(() => this.updateClock(), 1000);
        
        const barcodeInput = document.getElementById('barcodeInput');
        barcodeInput.focus();
        
        // Listener para leitura de código de barras (Enter)
        barcodeInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const code = barcodeInput.value.trim();
                if (code) {
                    this.searchProduct(code);
                }
            }
        });
    },

    updateClock() {
        const now = new Date();
        document.getElementById('clock').innerText = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second:'2-digit' });
    },

    selectPayment(el) {
        document.querySelectorAll('.payment-method').forEach(div => div.classList.remove('selected'));
        el.classList.add('selected');
        this.paymentMethod = el.getAttribute('data-method');
    },

    async searchProduct(code) {
        try {
            const res = await fetch(`/api/vendas/buscar-produto?code=${encodeURIComponent(code)}`);
            const json = await res.json();
            
            if (json.status === 'success') {
                this.addToCart(json.data);
                document.getElementById('barcodeInput').value = '';
            } else {
                Swal.fire({ toast: true, position: 'top-end', icon: 'error', title: json.message, showConfirmButton: false, timer: 2000 });
                document.getElementById('barcodeInput').select();
            }
        } catch (e) {
            console.error(e);
        }
    },

    addToCart(product) {
        // Verifica se já tem no carrinho
        const existing = this.cart.find(x => x.id === product.id);
        if (existing) {
            existing.qty += 1;
            // Check stock logic could be added here
        } else {
            this.cart.push({
                id: product.id,
                name: product.name,
                sku: product.sku,
                price: parseFloat(product.sale_price),
                qty: 1
            });
        }
        
        this.renderCart();
    },
    
    changeQty(id, delta) {
        const item = this.cart.find(x => x.id === id);
        if (item) {
            item.qty += delta;
            if (item.qty <= 0) {
                this.cart = this.cart.filter(x => x.id !== id);
            }
            this.renderCart();
        }
    },

    renderCart() {
        const list = document.getElementById('cartList');
        list.innerHTML = '';
        
        if (this.cart.length === 0) {
            list.innerHTML = `
                <div class="text-center text-muted mt-5 pt-5">
                    <i class="fa-solid fa-cart-arrow-down fs-1 mb-3 opacity-25"></i>
                    <h5>Carrinho Vazio</h5>
                    <p>Bipe um produto para começar a venda.</p>
                </div>`;
            this.updateTotals();
            return;
        }

        this.cart.forEach(item => {
            const subtotal = item.price * item.qty;
            const li = document.createElement('li');
            li.className = 'cart-item';
            li.innerHTML = `
                <div>
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-sku">SKU: ${item.sku} | Unit: R$ ${item.price.toFixed(2).replace('.', ',')}</div>
                </div>
                <div class="d-flex align-items-center gap-3">
                    <div class="d-flex align-items-center gap-2">
                        <button class="qty-btn" onclick="PdvManager.changeQty(${item.id}, -1)">-</button>
                        <span class="fw-bold fs-5" style="width: 30px; text-align: center;">${item.qty}</span>
                        <button class="qty-btn" onclick="PdvManager.changeQty(${item.id}, 1)">+</button>
                    </div>
                    <div class="cart-item-price fs-5" style="width: 100px; text-align: right;">
                        R$ ${subtotal.toFixed(2).replace('.', ',')}
                    </div>
                </div>
            `;
            list.appendChild(li);
        });
        
        // Scroll to bottom
        list.scrollTop = list.scrollHeight;
        
        this.updateTotals();
    },

    updateTotals() {
        const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
        let discount = parseFloat(document.getElementById('discountInput').value) || 0;
        
        if (discount > subtotal) {
            discount = subtotal;
            document.getElementById('discountInput').value = discount.toFixed(2);
        }
        
        const total = subtotal - discount;
        
        document.getElementById('lblSubtotal').innerText = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
        document.getElementById('lblDiscount').innerText = `- R$ ${discount.toFixed(2).replace('.', ',')}`;
        document.getElementById('lblTotal').innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
    },

    async checkout() {
        if (this.cart.length === 0) {
            Swal.fire('Carrinho Vazio', 'Adicione produtos antes de finalizar.', 'warning');
            return;
        }

        const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
        const discount = parseFloat(document.getElementById('discountInput').value) || 0;
        const total = subtotal - discount;

        const payload = {
            client_id: document.getElementById('clientSelect').value || null,
            total_amount: subtotal,
            discount: discount,
            final_amount: total,
            payment_method: this.paymentMethod,
            items: this.cart
        };

        // Confirmação Final Visual
        const conf = await Swal.fire({
            title: 'Finalizar Venda?',
            html: `Total a cobrar: <b>R$ ${total.toFixed(2).replace('.', ',')}</b><br>Modo: <b>${this.paymentMethod.toUpperCase()}</b>`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sim, Finalizar',
            cancelButtonText: 'Voltar',
            confirmButtonColor: '#10b981'
        });

        if (!conf.isConfirmed) return;

        try {
            const res = await fetch('/api/vendas/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const json = await res.json();

            if (json.status === 'success') {
                Swal.fire({
                    title: 'Venda Concluída!',
                    text: 'Deseja imprimir o recibo?',
                    icon: 'success',
                    showCancelButton: true,
                    confirmButtonText: 'Imprimir',
                    cancelButtonText: 'Nova Venda'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.open(`/vendas/recibo/${json.sale_id}`, '_blank');
                    }
                    
                    // Reset PDV
                    this.cart = [];
                    document.getElementById('clientSelect').value = '';
                    document.getElementById('discountInput').value = '0.00';
                    this.renderCart();
                    document.getElementById('barcodeInput').focus();
                });
            } else {
                Swal.fire('Erro', json.message, 'error');
            }
        } catch (e) {
            Swal.fire('Erro', 'Falha na comunicação com o servidor.', 'error');
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    PdvManager.init();
});
