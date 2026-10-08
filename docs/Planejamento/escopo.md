# SpaceHub — Escopo do projeto


## 1 - Documento de visão do projeto

O SpaceHub é uma plataforma web de aluguel de espaços e imóveis por temporada. Anfitriões podem publicar e gerenciar anúncios, enquanto hóspedes podem buscar espaços, consultar sua disponibilidade e realizar reservas. A plataforma centraliza as informações e impede reservas com períodos sobrepostos para o mesmo espaço.

A solução integra frontend, API própria e banco de dados, oferecendo um fluxo completo de reserva no computador e no celular.

### Perfis de usuário

- **Anfitrião (anunciante ou host):** disponibiliza espaços para aluguel e gerencia seus anúncios, preços, fotos e calendário.
- **Hóspede (guest):** busca espaços, consulta sua disponibilidade e realiza reservas.

Os espaços serão classificados por tipo, como imóvel por temporada, espaço de coworking ou sala de reunião.

## 2 - Requisitos

### Requisitos funcionais

- **RF01 — Contas:** permitir cadastro, login e logout seguro, diferenciando os papéis de anfitrião e hóspede.
- **RF02 — Anúncios:** permitir ao anfitrião cadastrar, consultar, editar e excluir seus próprios anúncios, com título, descrição, localização, tipo, características e preçopor noite ou por hora (de acordo com o tipo de espaço).
- **RF03 — Fotos:** permitir upload, exibição, substituição e remoção de fotos dos espaços, mantendo pelo menos uma foto em cada anúncio disponível para reserva.
- **RF04 — Preços:** permitir ao anfitrião definir e atualizar o preço de seus espaços.
- **RF05 — Calendário:** permitir ao anfitrião consultar a disponibilidade e bloquear períodos para impedir novas reservas.
- **RF06 — Busca:** permitir busca de espaços com filtros por localização, tipo, características, preço e período disponível. Exemplos de características: Wi-Fi, piscina, projetor e televisão.
- **RF07 — Detalhes:** exibir título, descrição, fotos, localização, características, preço e calendário de disponibilidade do espaço.
- **RF08 — Reservas:** permitir ao hóspede reservar um espaço disponível e persistir a reserva vinculada ao hóspede, ao espaço e ao período selecionado.
- **RF09 — Confirmação:** apresentar na interface a confirmação e os detalhes da reserva somente após sua gravação bem-sucedida no banco.
- **RF10 — Painel do hóspede:** apresentar reservas atuais, futuras e passadas do usuário autenticado.
- **RF11 — Painel do anfitrião:** apresentar seus espaços, datas reservadas, reservas atuais e futuras e histórico de aluguéis.
- **RF12 — Perfil:** permitir ao usuário atualizar seus próprios dados cadastrais.
- **RF13 — Avaliações e comentários:** permitir aos hóspedes publicar notas de 1 a 5 estrelas e comentários sobre os espaços, exibindo os comentários e a média das notas no anúncio.

### Regras de negócio

- **RN01 — Autorização:** apenas o anfitrião responsável por um anúncio pode alterá-lo, excluí-lo ou gerenciar suas fotos, preços e bloqueios. Essa autorização deve ser verificada no servidor.
- **RN02 — Disponibilidade:** um espaço só pode ser reservado se todo o período solicitado estiver livre de reservas e bloqueios.
- **RN03 — Sobreposição:** o servidor e o banco devem impedir reservas com períodos sobrepostos para o mesmo espaço.
- **RN04 — Consistência:** a criação da reserva deve usar transações e mecanismos de integridade ou controle de concorrência adequados para que apenas uma solicitação conflitante seja aceita.
- **RN05 — Validação:** os dados recebidos devem ser validados no servidor antes da gravação, incluindo campos obrigatórios, preço válido e intervalo de datas válido.
- **RN06 — Privacidade:** os painéis devem apresentar apenas informações associadas ao usuário autenticado; senhas e hashes não devem ser expostos nas respostas da API.
- **RN07 — Atualização:** alterações de anúncios, preços, bloqueios e reservas devem ser refletidas nas consultas à API e na disponibilidade apresentada pela interface.

### Requisitos de qualidade

- **RQ01 — Responsividade:** o fluxo completo de busca, visualização e reserva deve funcionar no computador e no celular.
- **RQ02 — Segurança:** armazenar senhas como hashes seguros e proteger as operações restritas com autenticação e autorização.
- **RQ03 — Tratamento de erros:** apresentar mensagens claras para dados inválidos, acesso indevido e conflitos de reserva, sem interromper a aplicação nem expor informações internas sensíveis.
- **RQ04 — Mídia:** validar os arquivos enviados e redimensionar ou otimizar fotos para que carreguem com rapidez no computador e no celular.
- **RQ05 — Persistência:** manter usuários, espaços e reservas em um banco de dados real, preservando os dados entre sessões e reinicializações.
- **RQ06 — Disponibilidade pública:** publicar frontend, API e banco em ambiente real, com o site acessível por link público.
- **RQ07 — Organização:** organizar o backend em módulos, com separação entre rotas, controladores, regras de negócio e modelos ou acesso a dados.

### Restrições da entrega

- Não aceitar reservas com períodos sobrepostos para o mesmo espaço, sob qualquer circunstância.
- Não usar anúncios e reservas fixos no HTML ou JavaScript como substitutos da integração com a API e da persistência no banco.
- Não permitir edição ou exclusão de anúncios de outros usuários.
- Não depender de CMS ou construtores sem código, como WordPress e Wix.
- Construir uma API própria para autenticação, gerenciamento e consulta de espaços e processamento de reservas.

### Decisões técnicas do projeto

- **Backend:** Node.js, Express e TypeScript.
- **Arquitetura:** backend modular em uma única aplicação.
- **Banco:** PostgreSQL relacional em nuvem, com relacionamentos entre usuários, espaços e reservas.
- **API:** comunicação HTTP com organização REST e validação das entradas no servidor.
- **Autenticação:** JWT para autenticação e proteção de rotas.
- **Senhas:** hashing seguro, como bcrypt; não armazenar senhas em texto puro nem com criptografia reversível.
- **Imagens:** armazenamento de arquivos em serviço apropriado, mantendo suas referências ou URLs no banco.

## 3 - Planejamento (histórias de usuários)

### Cadastro e acesso

- **US01:** Como visitante, quero criar uma conta com meu perfil de uso para anunciar espaços ou realizar reservas. (RF01)
- **US02:** Como usuário, quero entrar na minha conta para acessar minhas informações e funcionalidades. (RF01)
- **US03:** Como usuário, quero encerrar minha sessão com segurança para proteger minha conta. (RF01)
- **US04:** Como usuário, quero atualizar meus dados cadastrais para manter minhas informações corretas. (RF12; adicional)

### Anúncios e gestão do anfitrião

- **US06:** Como anfitrião, quero cadastrar um espaço com título, descrição, localização, tipo, características, preço por noite e pelo menos uma foto para disponibilizá-lo para reservas. (RF02, RF03, RF04)
- **US07:** Como anfitrião, quero editar meus anúncios para manter suas informações atualizadas. (RF02)
- **US08:** Como anfitrião, quero excluir um anúncio para retirar um espaço que não desejo mais oferecer. (RF02)
- **US09:** Como anfitrião, quero adicionar, substituir e remover fotos dos meus espaços para apresentar suas condições aos hóspedes. (RF03)
- **US10:** Como anfitrião, quero definir e atualizar o preço por noite dos meus espaços para manter os valores dos anúncios atualizados. (RF04)
- **US11:** Como anfitrião, quero bloquear períodos no calendário de um espaço para impedir reservas quando ele estiver indisponível. (RF05)
- **US12:** Como anfitrião, quero visualizar meus espaços e suas datas reservadas em um painel para organizar sua utilização. (RF05, RF11)
- **US13:** Como anfitrião, quero consultar o histórico de reservas dos meus espaços para acompanhar os aluguéis realizados. (RF11)

### Busca e escolha do espaço

- **US14:** Como hóspede, quero buscar espaços para encontrar opções que atendam à minha necessidade. (RF06)
- **US15:** Como hóspede, quero filtrar espaços por tipo para encontrar imóveis, espaços de coworking ou salas de reunião. (RF06)
- **US16:** Como hóspede, quero filtrar espaços por localização para encontrar opções na região desejada. (RF06)
- **US17:** Como hóspede, quero filtrar espaços por características para encontrar opções com os recursos de que preciso. (RF06)
- **US18:** Como hóspede, quero filtrar espaços por faixa de preço por noite para encontrar opções compatíveis com meu orçamento. (RF06)
- **US19:** Como hóspede, quero informar o período desejado na busca para encontrar espaços disponíveis nessas datas. (RF06)
- **US20:** Como hóspede, quero visualizar fotos, descrição, localização, características e preço por noite de um espaço para decidir se ele atende à minha necessidade. (RF07)
- **US21:** Como hóspede, quero consultar o calendário de disponibilidade de um espaço para escolher um período livre. (RF07)

### Reservas

- **US22:** Como hóspede, quero reservar um espaço durante um período disponível para garantir sua utilização. (RF08)
- **US23:** Como hóspede, quero visualizar na interface a confirmação e os detalhes da reserva após sua gravação para conferir o espaço e o período reservados. (RF09)
- **US24:** Como hóspede, quero visualizar minhas reservas atuais e futuras em um painel para acompanhar meus agendamentos. (RF10)
- **US25:** Como hóspede, quero consultar minhas reservas passadas para acessar meu histórico de utilização. (RF10)
- **US26:** Como hóspede, quero ser informado quando o período escolhido ficar indisponível durante a reserva para selecionar outro período. (RF08, RN02, RN03)
- **US27:** Como anfitrião, quero consultar as reservas atuais e futuras dos meus espaços para acompanhar sua ocupação e planejar os próximos aluguéis. (RF11)

### Avaliações e comentários

- **US28:** Como hóspede, quero publicar uma nota de 1 a 5 estrelas e um comentário sobre um espaço para compartilhar minha experiência. (RF14)
- **US29:** Como hóspede, quero consultar os comentários e a média das notas de um espaço para apoiar minha decisão de reserva. (RF14)

## 4 - Critérios de aceite da entrega

- **Autenticação:** o usuário consegue criar conta, entrar, sair e acessar apenas as funcionalidades permitidas ao seu perfil; áreas restritas rejeitam acessos sem autenticação.
- **Autorização:** tentar alterar o identificador de um anúncio na requisição não permite editar, excluir ou gerenciar anúncios de outro anfitrião.
- **Anúncios:** o anfitrião consegue cadastrar, consultar, editar e excluir seus anúncios; cada anúncio disponível para reserva tem os dados obrigatórios e pelo menos uma foto. Alterações aparecem nas consultas e na busca.
- **Busca:** os filtros de localização, tipo, características, preço e período funcionam; espaços ocupados ou bloqueados não são apresentados como disponíveis no período pesquisado.
- **Disponibilidade:** tentativas de reserva com sobreposição parcial, total ou com período bloqueado são rejeitadas com mensagem clara.
- **Concorrência:** duas solicitações simultâneas para períodos conflitantes no mesmo espaço resultam em apenas uma reserva gravada.
- **Persistência:** uma reserva confirmada permanece no banco e nos painéis após atualização da página e reinicialização da aplicação, vinculada ao hóspede, espaço e período corretos.
- **Painéis:** o hóspede consulta suas reservas atuais, futuras e passadas; o anfitrião consulta seus espaços e respectivas reservas, sem acesso a dados privados de terceiros.
- **Validação e erros:** campos obrigatórios ausentes, preço inválido, datas inválidas e acesso indevido geram respostas controladas, sem derrubar a aplicação ou expor senhas, hashes e detalhes internos.
- **Mídia:** fotos podem ser enviadas e exibidas, com validação dos arquivos e otimização para carregamento no computador e no celular.
- **Entrega pública:** pelo link público, o usuário consegue abrir o site no celular ou computador, buscar um espaço, visualizar fotos e concluir uma reserva usando a API e o banco publicados.
- **Organização do código:** o backend possui separação clara entre rotas, controladores, regras de negócio e acesso a dados.
- **Avaliações e comentários:** o hóspede autenticado consegue publicar uma nota de 1 a 5 estrelas e um comentário; os dados são persistidos e exibidos no anúncio, e a média das notas é calculada corretamente. Notas fora da faixa permitida são rejeitadas pelo servidor.

## 5 - Possibilidades de expansão

As funcionalidades abaixo ficam fora da entrega inicial obrigatória e podem ser desenvolvidas após o MVP:

- Simulação de pagamentos em ambiente de testes e emissão de recibos.
- Favoritos ou lista de desejos.
- Notificações automáticas por e-mail; a confirmação na interface já faz parte da entrega inicial.
- Dashboard financeiro com ganhos e taxa de ocupação do anfitrião.
- Busca por raio geográfico e localização atual.