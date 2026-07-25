const ProductManager = {
    modal: null,
    products: [],

    init() {
        this.modal = new bootstrap.Modal(document.getElementById('productModal'));
        this.loadProducts();
    },

    async loadProducts() {
        const search = document.getElementById('searchInput').value;
        const tbody = document.getElementById('productsTableBody');
        
        try {
            const response = await fetch(`/api/produtos?search=${encodeURIComponent(search)}`);
            const json = await response.json();
            
            if (json.status === 'success') {
                this.products = json.data;
                this.renderTable(this.products);
            }
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
            tbody.innerHTML = `<tr><td colspan="5" class="text-center text-danger">Erro ao carregar produtos.</td></tr>`;
        }
    },

    renderTable(products) {
        const tbody = document.getElementById('productsTableBody');
        tbody.innerHTML = '';

        if (products.length === 0) {
            tbody.innerHTML = `<tr><td colspan="5" class="text-center text-muted py-4">Nenhum produto encontrado.</td></tr>`;
            return;
        }

        products.forEach(p => {
            // Formatação de Preço
            const price = parseFloat(p.sale_price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            
            // Lógica de Estoque
            let stockBadge = '';
            if (p.stock_quantity <= p.min_stock) {
                stockBadge = `<span class="stock-badge stock-low"><i class="fa-solid fa-triangle-exclamation me-1"></i> ${p.stock_quantity} (Baixo)</span>`;
            } else {
                stockBadge = `<span class="stock-badge stock-ok">${p.stock_quantity} Unid.</span>`;
            }

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>
                    <div class="fw-bold text-dark">${p.name}</div>
                    <small class="text-muted">SKU: ${p.sku}</small>
                </td>
                <td>${p.category || '-'}</td>
                <td class="fw-bold text-success">${price}</td>
                <td>${stockBadge}</td>
                <td class="text-end">
                    <button class="btn btn-sm btn-light text-primary" onclick="ProductManager.editProduct(${p.id})">
                        <i class="fa-solid fa-pen"></i> Editar
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    },

    openModal() {
        document.getElementById('productForm').reset();
        document.getElementById('productId').value = '';
        document.getElementById('modalTitle').textContent = 'Novo Produto';
        document.getElementById('labelPreviewArea').style.display = 'none';
        
        // Gera um SKU aleatório caso seja um novo produto para facilitar
        document.getElementById('productSku').value = 'PRD-' + Math.floor(Math.random() * 90000 + 10000);
        
        this.modal.show();
    },

    editProduct(id) {
        const p = this.products.find(x => x.id == id);
        if (!p) return;

        document.getElementById('productId').value = p.id;
        document.getElementById('productName').value = p.name;
        document.getElementById('productSku').value = p.sku;
        document.getElementById('productBarcode').value = p.barcode || '';
        document.getElementById('productCategory').value = p.category || '';
        document.getElementById('productCost').value = p.cost_price;
        document.getElementById('productSale').value = p.sale_price;
        document.getElementById('productStock').value = p.stock_quantity;
        document.getElementById('productMinStock').value = p.min_stock;
        
        document.getElementById('modalTitle').textContent = 'Editar Produto';
        
        // Se tiver barcode, mostra os geradores visuais
        if (p.barcode) {
            document.getElementById('labelPreviewArea').style.display = 'block';
            document.getElementById('imgBarcode').src = `/api/produtos/barcode/${p.barcode}`;
            document.getElementById('txtBarcode').innerText = p.barcode;
            document.getElementById('imgQrcode').src = `/api/produtos/qrcode/${p.sku}`; // QRCode apontando pro SKU
        } else {
            document.getElementById('labelPreviewArea').style.display = 'none';
        }

        this.modal.show();
    },

    async saveProduct() {
        const name = document.getElementById('productName').value;
        const sku = document.getElementById('productSku').value;
        
        if (!name || !sku) {
            Swal.fire('Atenção', 'Nome e SKU são obrigatórios.', 'warning');
            return;
        }

        const data = {
            id: document.getElementById('productId').value || null,
            name: name,
            sku: sku,
            barcode: document.getElementById('productBarcode').value,
            category: document.getElementById('productCategory').value,
            cost_price: document.getElementById('productCost').value || 0,
            sale_price: document.getElementById('productSale').value || 0,
            stock_quantity: document.getElementById('productStock').value || 0,
            min_stock: document.getElementById('productMinStock').value || 5
        };

        try {
            const response = await fetch('/api/produtos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const json = await response.json();

            if (json.status === 'success') {
                Swal.fire('Sucesso', json.message, 'success');
                this.modal.hide();
                this.loadProducts();
            } else {
                Swal.fire('Erro', json.message, 'error');
            }
        } catch (error) {
            Swal.fire('Erro', 'Ocorreu um erro ao salvar o produto.', 'error');
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    ProductManager.init();
});
