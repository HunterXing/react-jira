/*
 * @description: 任务类型
 * @Date: 2022-04-05 13:37:23
 * @Author: xingheng
 */

export interface Task {
  id: number;
  name: string;
  // 经办人id
  processorId: number;
  projectId: number;
  // 任务组id
  epicId: number;
  // 看板id
  panelId: number;
  // bug or task
  typeId: number;
  note: string;
}
