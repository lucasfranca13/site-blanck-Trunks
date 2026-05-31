/* Dados do catálogo — edite nomes, preços e imagens aqui */
window.CATALOG_CATEGORIES = [
  { slug: 'calcas', title: 'Calças' },
  { slug: 'camisas', title: 'Camisas' },
  { slug: 'shorts', title: 'Shorts' },
  { slug: 'corta-vento', title: 'Corta vento' },
  { slug: 'bones', title: 'Bonés' },
  { slug: 'bermudas', title: 'Bermudas' },
];

window.CATALOG_LINES = [
  {
    gender: 'masculino',
    prefix: 'm',
    products: [
      { category: 'calcas', name: 'BT Tactical Pant', desc: 'Calça cargo com reforço nos joelhos e cós ajustável. Tecido ripstop resistente.', price: 289, img: 'img/produtos/concrete jungle c.JPG', hero: true, badge: 'Destaque' },
      { category: 'calcas', name: 'Urban Cargo Pant', desc: 'Modelagem relaxed, bolsos laterais amplos e acabamento fosco.', price: 249, img: 'img/produtos/classic.JPG' },
      { category: 'calcas', name: 'Slim Fit BT', desc: 'Calça slim em sarja premium. Versátil para street e casual.', price: 219, img: 'img/produtos/bt tree c.JPG' },

      { category: 'camisas', name: 'Eagle Classic Tee', desc: 'Camiseta premium com estampa da águia em silk de alta resolução. Algodão 100% penteado.', price: 189, img: 'img/produtos/classic.JPG', spotlight: true, badge: 'Best seller' },
      { category: 'camisas', name: 'Concrete Line Tee', desc: 'Estampa geométrica full print. Malha 30.1 com toque macio.', price: 179, img: 'img/produtos/concrete jungle c.JPG' },
      { category: 'camisas', name: 'Tree Vision Tee', desc: 'Gráfico árvore e sol em cores vibrantes. Corte regular.', price: 169, img: 'img/produtos/bt tree c.JPG', badge: 'Novo' },

      { category: 'shorts', name: 'Street Short BT', desc: 'Short esportivo com cordão interno e bolso zíper.', price: 149, img: 'img/produtos/classic.JPG' },
      { category: 'shorts', name: 'Essential Short', desc: 'Comprimento médio, tecido leve e secagem rápida.', price: 129, img: 'img/produtos/bt tree c.JPG', spotlight: true },

      { category: 'corta-vento', name: 'BT Signature Windbreaker', desc: 'Corta vento leve com capuz e forro mesh. Resistente à água.', price: 379, img: 'img/produtos/concrete jungle c.JPG', hero: true, badge: 'Edição limitada' },
      { category: 'corta-vento', name: 'Light Shell CV', desc: 'Camada externa minimalista, packable na manga.', price: 299, img: 'img/produtos/classic.JPG' },

      { category: 'bones', name: 'Tactical Cap BT', desc: 'Cap 6 panels com logo metálico. Aba pré-curvada, snapback.', price: 129, img: 'img/produtos/bt tree c.JPG', spotlight: true, badge: 'Destaque' },
      { category: 'bones', name: 'Classic Dad Cap', desc: 'Aba curva, bordado discreto BT. Ajuste fivela metálica.', price: 109, img: 'img/produtos/classic.JPG' },

      { category: 'bermudas', name: 'BT Field Bermuda', desc: 'Bermuda cargo com cintura confortável e bolsos utilitários.', price: 159, img: 'img/produtos/concrete jungle c.JPG' },
      { category: 'bermudas', name: 'Summer Bermuda', desc: 'Linho misto, corte acima do joelho. Ideal para calor.', price: 139, img: 'img/produtos/bt tree c.JPG', badge: 'Novo' },
    ],
  },
  {
    gender: 'feminino',
    prefix: 'f',
    products: [
      { category: 'calcas', name: 'High Waist BT Pant', desc: 'Calça cintura alta, modelagem wide leg e tecido fluido.', price: 269, img: 'img/produtos/classic.JPG', hero: true, badge: 'Destaque' },
      { category: 'calcas', name: 'Slim Street Pant', desc: 'Calça skinny com elastano. Conforto o dia todo.', price: 239, img: 'img/produtos/concrete jungle c.JPG' },

      { category: 'camisas', name: 'Eagle Fit Crop', desc: 'Crop com estampa águia em silk HD. Algodão penteado.', price: 179, img: 'img/produtos/classic.JPG', hero: true, badge: 'Best seller' },
      { category: 'camisas', name: 'Urban Mesh Tee', desc: 'Camiseta oversized em malha respirável com logo BT.', price: 159, img: 'img/produtos/concrete jungle c.JPG', spotlight: true },
      { category: 'camisas', name: 'Sunset Tree Tee', desc: 'Estampa artística árvore e sol. Corte feminino.', price: 169, img: 'img/produtos/bt tree c.JPG' },

      { category: 'shorts', name: 'Active Short Fem', desc: 'Short fitness com cintura elástica e logo reflexivo.', price: 139, img: 'img/produtos/bt tree c.JPG' },
      { category: 'shorts', name: 'Lounge Short', desc: 'Tecido felpudo leve. Conforto pós-treino.', price: 119, img: 'img/produtos/classic.JPG', badge: 'Novo' },

      { category: 'corta-vento', name: 'Windbreaker Fem BT', desc: 'Corte feminino, capuz ajustável e zíperes contrastantes.', price: 359, img: 'img/produtos/concrete jungle c.JPG', spotlight: true, badge: 'Destaque' },
      { category: 'corta-vento', name: 'Packable Shell', desc: 'Ultraleve, dobra no bolso frontal. Ideal para viagem.', price: 279, img: 'img/produtos/classic.JPG' },

      { category: 'bones', name: 'Curve Cap BT', desc: 'Boné aba curva com bordado rose gold. Ajuste snapback.', price: 119, img: 'img/produtos/bt tree c.JPG' },
      { category: 'bones', name: 'Minimal Logo Cap', desc: 'Design clean, logo pequeno frontal. Unissex fit feminino.', price: 109, img: 'img/produtos/classic.JPG', badge: 'Novo' },

      { category: 'bermudas', name: 'Cargo Bermuda Fem', desc: 'Bermuda cargo feminina com cós médio e bolsos amplos.', price: 149, img: 'img/produtos/concrete jungle c.JPG' },
      { category: 'bermudas', name: 'Linen Bermuda', desc: 'Tecido linho leve, corte solto e elegante.', price: 129, img: 'img/produtos/bt tree c.JPG', spotlight: true },
    ],
  },
];
