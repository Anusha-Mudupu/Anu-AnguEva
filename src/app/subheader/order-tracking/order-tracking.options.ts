/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
export const DEFAULT_STATUS_VALUES = {
  statuses: [{
    text: 'Not Started',
    styles: { borderColor: '', textColor: '#A5A5A5', iconClass: 'fa fa-circle-o', iconPath: '' }
  }, {
    text: 'In progress',
    styles: { borderColor: '', textColor: '#0077C8', iconClass: 'fa fa-exclamation-circle', iconPath: '' }
  }, {
    text: 'Completed',
    styles: { borderColor: '#0077C8', textColor: '#49AF57', iconClass: 'fa fa-check-circle', iconPath: '' }
  }],
  showTopEdge: false,
  showBottomEdge: false
};

export interface TimelineFlowOptions {
  statuses: StatusConfig[];
  showTopEdge?: boolean;
  showBottomEdge?: boolean;
}

interface StatusConfig {
  text: string;
  styles?: StatusConfigStyles;
}

interface StatusConfigStyles {
  borderColor?: string;
  textColor?: string;
  iconClass?: string;
  iconPath?: string;
}

export interface StepsData {
  step: string;
  status: string;
}