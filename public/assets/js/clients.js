const ClientManager = {
    modal: null,
    clients: [],

    init() {
        this.modal = new bootstrap.Modal(document.getElementById('clientModal'));
        this.loadClients();
    },

    async loadClients() {
        const search = document.getElementById('searchInput').value;
        const tbody = document.getElementById('clientsTableBody');
        
        try {
            const response = await fetch(`/api/clientes?search=${encodeURIComponent(search)}`);
            const json = await response.json();
            
            if (json.status === 'success') {
                this.clients = json.data;
                this.renderTable(this.clients);
            }
        } catch (error) {
            console.error('Erro ao buscar clientes:', error);
            tbody.innerHTML = `<tr><td colspan="5" class="text-center text-danger">Erro ao carregar clientes.</td></tr>`;
        }
    },

    renderTable(clients) {
        const tbody = document.getElementById('clientsTableBody');
        tbody.innerHTML = '';

        if (clients.length === 0) {
            tbody.innerHTML = `<tr><td colspan="5" class="text-center text-muted py-4">Nenhum cliente encontrado.</td></tr>`;
            return;
        }

        clients.forEach(client => {
            const statusBadge = client.status 
                ? `<span class="status-badge status-active">Ativo</span>` 
                : `<span class="status-badge status-inactive">Inativo</span>`;
            
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>
                    <div class="fw-bold text-dark">${client.name}</div>
                    <small class="text-muted">${client.email || 'Sem e-mail'}</small>
                </td>
                <td>${client.document || '-'}</td>
                <td>${client.phone || '-'}</td>
                <td>${statusBadge}</td>
                <td class="text-end">
                    <button class="btn btn-sm btn-light text-primary me-2" onclick="ClientManager.editClient(${client.id})">
                        <i class="fa-solid fa-pen"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    },

    openModal() {
        document.getElementById('clientForm').reset();
        document.getElementById('clientId').value = '';
        document.getElementById('modalTitle').textContent = 'Novo Cliente';
        document.getElementById('clientStatus').checked = true;
        this.modal.show();
    },

    editClient(id) {
        const client = this.clients.find(c => c.id == id);
        if (!client) return;

        document.getElementById('clientId').value = client.id;
        document.getElementById('clientName').value = client.name;
        document.getElementById('clientDocument').value = client.document || '';
        document.getElementById('clientEmail').value = client.email || '';
        document.getElementById('clientPhone').value = client.phone || '';
        document.getElementById('clientBirthdate').value = client.birthdate || '';
        document.getElementById('clientZipcode').value = client.zipcode || '';
        document.getElementById('clientAddress').value = client.address || '';
        document.getElementById('clientNumber').value = client.number || '';
        document.getElementById('clientNeighborhood').value = client.neighborhood || '';
        document.getElementById('clientCity').value = client.city || '';
        document.getElementById('clientState').value = client.state || '';
        document.getElementById('clientObservations').value = client.observations || '';
        document.getElementById('clientStatus').checked = client.status;
        
        document.getElementById('modalTitle').textContent = 'Editar Cliente';
        this.modal.show();
    },

    async saveClient() {
        const name = document.getElementById('clientName').value;
        if (!name) {
            Swal.fire('Atenção', 'O nome do cliente é obrigatório', 'warning');
            return;
        }

        const clientData = {
            id: document.getElementById('clientId').value || null,
            name: name,
            document: document.getElementById('clientDocument').value,
            email: document.getElementById('clientEmail').value,
            phone: document.getElementById('clientPhone').value,
            birthdate: document.getElementById('clientBirthdate').value,
            zipcode: document.getElementById('clientZipcode').value,
            address: document.getElementById('clientAddress').value,
            number: document.getElementById('clientNumber').value,
            neighborhood: document.getElementById('clientNeighborhood').value,
            city: document.getElementById('clientCity').value,
            state: document.getElementById('clientState').value,
            observations: document.getElementById('clientObservations').value,
            status: document.getElementById('clientStatus').checked ? 1 : 0
        };

        try {
            const response = await fetch('/api/clientes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(clientData)
            });
            const json = await response.json();

            if (json.status === 'success') {
                Swal.fire('Sucesso', json.message, 'success');
                this.modal.hide();
                this.loadClients();
            } else {
                Swal.fire('Erro', json.message, 'error');
            }
        } catch (error) {
            Swal.fire('Erro', 'Ocorreu um erro ao salvar o cliente.', 'error');
        }
    },

    async fetchAddress() {
        let zip = document.getElementById('clientZipcode').value.replace(/\D/g, '');
        if (zip.length === 8) {
            try {
                const response = await fetch(`https://viacep.com.br/ws/${zip}/json/`);
                const data = await response.json();
                if (!data.erro) {
                    document.getElementById('clientAddress').value = data.logradouro;
                    document.getElementById('clientNeighborhood').value = data.bairro;
                    document.getElementById('clientCity').value = data.localidade;
                    document.getElementById('clientState').value = data.uf;
                    document.getElementById('clientNumber').focus();
                }
            } catch (e) {
                console.error("Erro ao buscar CEP", e);
            }
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    ClientManager.init();
});
