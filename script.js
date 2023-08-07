class Produto {
    constructor(){
        this.id = 1;
       this.arrayProdutos = [];
       this.editId = null;

       const storedData = localStorage.getItem('produtos');
        if (storedData) {
            this.arrayProdutos = JSON.parse(storedData);
            this.id = this.arrayProdutos.length + 1; 
            this.listaTabela(); 
        }
       
    }


    atualizarLocalStorage() {
        localStorage.setItem('produtos', JSON.stringify(this.arrayProdutos));
    }

    salvar() {
       let produto = this.lerDados();
       if (this.validaCampos(produto)) {
            if(this.editId == null) {
                this.adicionar(produto);
            } else {
                this.atualizar(this.editId, produto);
            }
            
       }
       this.atualizarLocalStorage();   
       this.listaTabela();
       this.cancelar();
    }

    listaTabela() {
        let tbody = document.getElementById('tbody');
        tbody.innerText = '';

        for(let i = 0; i < this.arrayProdutos.length; i++ ) {
            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_item = tr.insertCell();
            let td_valor = tr.insertCell();
            let td_acoes = tr.insertCell();

            td_id.innerText = this.arrayProdutos[i].id;
            td_item.innerText = this.arrayProdutos[i].nomeProduto
            td_valor.innerText = parseFloat(this.arrayProdutos[i].valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

            let imgEdit = document.createElement('img');
            imgEdit.src = 'img/editar.svg';
            imgEdit.setAttribute("onclick", "produto.edicao("+ JSON.stringify(this.arrayProdutos[i]) + ")");
            

            let imgDelete = document.createElement('img');
            imgDelete.src = 'img/delet.svg';
            imgDelete.setAttribute("onclick", "produto.deletar(" + this.arrayProdutos[i].id + ")");

            td_acoes.appendChild(imgEdit);
            td_acoes.appendChild(imgDelete);
        }
    }

     ordenarPorId() {
        this.arrayProdutos.sort((a, b) => a.id - b.id);
    }

    adicionar(produto) {
        produto.valor = parseFloat(produto.valor)
        this.arrayProdutos.push(produto);
        this.id++;
        this.atualizarValorTotal();
        this.atualizarLocalStorage();
        this.ordenarPorId();
    }

    atualizar(id, produto) {
        
        for (let i = 0; i < this.arrayProdutos.length; i++) {
            if(this.arrayProdutos[i].id === id) {
                this.arrayProdutos[i].nomeProduto = produto.nomeProduto;
                this.arrayProdutos[i].valor = parseFloat(produto.valor);
            }
        }
        this.atualizarLocalStorage();
        this.atualizarValorTotal();
        
    }

    edicao(dados) {
        this.editId = dados.id; 


        document.getElementById('produto').value = dados.nomeProduto;
        document.getElementById('valor').value = dados.valor;

        document.getElementById('btn-1').innerText = 'Atualizar';
    }

    lerDados() {
        let produto = {}
        
        produto.id = this.id;
        produto.nomeProduto = document.getElementById('produto').value;
        produto.valor = document.getElementById('valor').value;


        return produto;
    }

    validaCampos(produto) {
        let msg = '';
        if(produto.nomeProduto == '') {
            msg += 'Informe o nome do item! \n';
        }
        if (produto.valor == '') {
            msg += 'Informe o valor do item! \n';
        }

        if(msg != '') {
            alert(msg);
            return false
        }

        return true;
    }

    cancelar() {
        document.getElementById('produto').value = '';
        document.getElementById('valor').value = '';

        document.getElementById('btn-1').innerText = 'Salvar';
        this.editId = null;
        this.atualizarLocalStorage();

    }

    calcularSoma() {
        let somaTotal = 0;
        for (let i = 0; i < this.arrayProdutos.length; i ++) {
            somaTotal += this.arrayProdutos[i].valor;
        }
        return somaTotal;
    }

    atualizarValorTotal() {
        let totalSomaElement = document.getElementById('totalSoma');
        let somaTotal = this.calcularSoma();
        totalSomaElement.innerText = `Soma total: R$ ${somaTotal.toFixed(2)}`;
    }


    deletar(id) {

        if(confirm('Deseja realmente excluir o item de ID ' +id+ '?')){
        let tbody = document.getElementById('tbody');

        for(let i = 0; i < this.arrayProdutos.length; i++) {
            if(this.arrayProdutos[i].id == id) {
                this.arrayProdutos.splice(i, 1);
                tbody.deleteRow(i);
            }
        }
        this.listaTabela();
        this.atualizarValorTotal();
        this.atualizarLocalStorage();
        this.ordenarPorId();
    }

    
    
}

}  
var produto = new Produto()

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('btn-calcular').addEventListener('click', function() {
        let totalSomaElement = document.getElementById('totalSoma');
        let somaTotal = produto.calcularSoma();
        totalSomaElement.innerText = `Soma total: R$ ${somaTotal.toFixed(2)}`; 
    });
});