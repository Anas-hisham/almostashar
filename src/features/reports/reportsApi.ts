import { api } from "@/lib/axios";
import { API_ENDPOINTS } from "@/constants/apiEndpoints";
import type { ApiResponse } from "@/features/admin/adminTypes";
import type { CreateReportRequest, GetReportsParams, Report, ReportDetails, ReportsPage, UpdateReportStatusRequest } from "@/features/reports/reportsTypes";

const { REPORTS } = API_ENDPOINTS;

export const reportsApi = {
  createReport: async (body: CreateReportRequest): Promise<void> => {
    await api.post(REPORTS.CREATE, body);
  },

  /* ----- admin ----- */

  getReports: async (params: GetReportsParams = {}): Promise<ReportsPage> => {
    const { data } = await api.get<ApiResponse<ReportsPage>>(REPORTS.ADMIN_LIST, { params });
    return data.value;
  },

  getReportById: async (id: number): Promise<ReportDetails> => {
    const { data } = await api.get<ApiResponse<ReportDetails>>(REPORTS.ADMIN_BY_ID(id));
    return data.value;
  },

  updateReportStatus: async (id: number, body: UpdateReportStatusRequest): Promise<void> => {
    await api.patch(REPORTS.ADMIN_STATUS(id), body);
  },
};
