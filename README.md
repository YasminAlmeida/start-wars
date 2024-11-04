<h1>Projeto Star Wars API</h1>

<p>Este projeto é uma aplicação <strong>React</strong> desenvolvida com <strong>TypeScript</strong> para capturar e exibir dados do universo Star Wars, fornecidos pela <a href="https://swapi.dev/" target="_blank">API do Star Wars</a>. O objetivo é apresentar esses dados de maneira intuitiva, com funcionalidades que permitem ao usuário interagir, filtrar e buscar informações.</p>

<h2>Índice</h2>
<ul>
  <li><a href="#sobre-o-projeto">Sobre o Projeto</a></li>
  <li><a href="#tecnologias-utilizadas">Tecnologias Utilizadas</a></li>
  <li><a href="#funcionalidades">Funcionalidades</a></li>
  <li><a href="#configuração-do-projeto">Configuração do Projeto</a></li>
  <li><a href="#scripts-disponíveis">Scripts Disponíveis</a></li>
  <li><a href="#deploy-na-aws">Deploy na AWS</a></li>
  <li><a href="#acesso-ao-projeto">Acesso ao Projeto</a></li>
</ul>

<h2 id="sobre-o-projeto">Sobre o Projeto</h2>

<p>O projeto consome a <strong>API do Star Wars</strong> para obter dados e exibi-los em uma interface que faz uso do <strong>Ant Design</strong> para uma experiência de usuário moderna. A aplicação oferece uma interface onde o usuário pode:</p>
<ul>
  <li>Visualizar listas de personagens, filmes, planetas, espécies, naves e veículos</li>
  <li>Interagir com tabelas e modais para obter detalhes de cada item</li>
  <li>Utilizar filtros e botões de ação para explorar os dados</li>
</ul>

<h2 id="tecnologias-utilizadas">Tecnologias Utilizadas</h2>

<p>As principais tecnologias e bibliotecas usadas neste projeto incluem:</p>
<ul>
  <li><strong>React</strong> e <strong>TypeScript</strong>: Linguagem principal e base para construção da interface.</li>
  <li><strong>Ant Design</strong>: Biblioteca de componentes para UI, incluindo tabelas, modais, botões, inputs de busca e paginação.</li>
  <li><strong>Axios</strong>: Utilizado para capturar dados da API.</li>
  <li><strong>React Query</strong>: Gerenciamento de estado assíncrono e cache de dados da API, permitindo uma experiência de usuário mais rápida e eficiente.</li>
  <li><strong>AWS S3 e CloudFront</strong>: Armazenamento e distribuição do conteúdo para o deploy.</li>
</ul>

<h2 id="funcionalidades">Funcionalidades</h2>

<p>A aplicação conta com as seguintes funcionalidades:</p>
<ul>
  <li>Consulta e visualização dos dados de Star Wars a partir da API.</li>
  <li>Filtros interativos e botões de ação para facilitar a navegação.</li>
  <li>Busca dinâmica para encontrar itens específicos.</li>
  <li>Exibição de tabelas paginadas com detalhes acessíveis via modais.</li>
  <li>Responsividade para diferentes dispositivos.</li>
</ul>

<h2 id="configuração-do-projeto">Configuração do Projeto</h2>

<p>Para executar o projeto localmente, siga os passos abaixo:</p>
<ol>
  <li>Clone o repositório:</li>
</ol>
<pre><code>git clone &lt;URL_DO_REPOSITORIO&gt;
cd 
</code></pre>

<ol start="2">
  <li>Instale as dependências:</li>
</ol>
<pre><code>npm install
</code></pre>

<h2 id="scripts-disponíveis">Scripts Disponíveis</h2>

<p>No diretório do projeto, você pode executar:</p>
<ul>
  <li><code>npm start</code>: Inicia o projeto em modo de desenvolvimento.</li>
  <li><code>npm run build</code>: Compila o projeto para produção.</li>
</ul>

<h2 id="deploy-na-aws">Deploy na AWS</h2>

<p>O projeto foi implantado na AWS, utilizando o S3 e o CloudFront para hospedagem e distribuição.</p

<h2 id="acesso-ao-projeto">Acesso ao Projeto</h2>

<p>Acesse a aplicação pela URL do CloudFront:</p>
<p><strong>URL:</strong> <a href="http://d2wrui38f4509q.cloudfront.net/" target="_blank">https://xyz123.cloudfront.net</a></p>
