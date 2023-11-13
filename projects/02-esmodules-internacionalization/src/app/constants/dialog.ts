export namespace Dialog {
  export const ASK_BY_NAME = 'Qual o seu nome? ';

  export const LIST_MENU_AND_ASK_BY_OPTION = `
    Selecione uma das opções abaixo:
    [1] - Exibir catálogo de veículos
    [2] - Adicionar veículo ao catálogo
    [3] - Editar veículo existente
    [4] - Excluir um veículo do catálogo
    [Q] - Sair

    : `;

  export const VEHICLE_EMPTY_LIST_MESSAGE = 'Parece que nenhum veículo foi cadastrado.';

  export namespace RegisterVehicle {
    export const ASK_BY_NAME = 'Nome do veículo: ';

    export const ASK_BY_COLORS = 'Cores disponíveis: ';

    export const ASK_BY_KM_TRAVALLED = 'Km Viajados: ';

    export const ASK_BY_MANUFACTURING_DATE = 'Data de fabricação (dd-mm-aa): ';

    export const CONFIRM = 'Confirma o cadastro do veículo ${name}? [S - Sim] [N - Não]: ';
  }
}
