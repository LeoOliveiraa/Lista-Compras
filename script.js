class Produto {
    constructor(){
       this.arrayProdutos = [];
    }

    salvar() {
       let produto = this.lerDados();
       if (this.validaCampos(produto)) {
            this.adicionar(produto);
       }   
       this.listaTabela();
       this.cancelar();
    }

    listaTabela() {
        let tbody = document.getElementById('tbody');
        tbody.innerText = '';

        for(let i = 0; i < this.arrayProdutos.length; i++ ) {
            let tr = tbody.insertRow();

            let td_item = tr.insertCell();
            let td_valor = tr.insertCell();
            let td_acoes = tr.insertCell();

            td_item.innerText = this.arrayProdutos[i].nomeProduto
            td_valor.innerText = this.arrayProdutos[i].valor

            let imgEdit = document.createElement('img');
            imgEdit.src = 'img/editar.svg';
            

            let imgDelete = document.createElement('img');
            imgDelete.src = 'img/delet.svg';

            td_acoes.appendChild(imgEdit);
            td_acoes.appendChild(imgDelete);
        }
    }

    adicionar(produto) {
        this.arrayProdutos.push(produto);
    }

    lerDados() {
        let produto = {}
        
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
    }
}

var produto = new Produto()