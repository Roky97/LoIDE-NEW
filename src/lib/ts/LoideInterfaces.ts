export interface ISolverOption {
    id: number;
    name: string;
    values: string[];
}

export interface ModalProps {
    show: boolean;
    onHide: () => void;
}

export interface IToggleItem {
    toggle: (newStatus: boolean) => void;
    show: boolean;
}