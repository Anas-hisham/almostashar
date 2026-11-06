/** Enums used by the app and the API. Values are exactly what the backend sends / expects (from Swagger). */

export enum AccountStatus {
  Active = "Active",
  PendingReview = "PendingReview",
  EmailVerificationRequired = "EmailVerificationRequired",
  Suspended = "Suspended",
}

export enum CallType {
  Video = "Video",
  Voice = "Voice",
}

export enum CaseSource {
  External = "External",
  Platform = "Platform",
}

export enum CaseStatus {
  Open = "Open",
  InProgress = "InProgress",
  Closed = "Closed",
  Dismissed = "Dismissed",
  OnHold = "OnHold",
  Canceled = "Canceled",
  PendingConfirmation = "PendingConfirmation",
}

export enum ClientRequestStatus {
  Pending = "Pending",
  Accepted = "Accepted",
  InProgress = "InProgress",
  Completed = "Completed",
  Cancelled = "Cancelled",
  Rejected = "Rejected",
}

export enum ClientRole {
  Plaintiff = "Plaintiff",
  Defendant = "Defendant",
}

export enum CommunicationMethod {
  Video = "Video",
  Voice = "Voice",
  Text = "Text",
}

export enum CompanyType {
  LLC = "LLC",
  SoleProprietorship = "SoleProprietorship",
  JointStock = "JointStock",
  Partnership = "Partnership",
  Other = "Other",
}

export enum ContractType {
  Employment = "Employment",
  Rental = "Rental",
  Sales = "Sales",
  Partnership = "Partnership",
  NDA = "NDA",
  Other = "Other",
  Settlement = "Settlement",
  Agency = "Agency",
}

export enum DisputeResolutionType {
  ReleaseToLawyer = "ReleaseToLawyer",
  RefundToClient = "RefundToClient",
  Dismiss = "Dismiss",
}

export enum DisputeStatus {
  Open = "Open",
  UnderReview = "UnderReview",
  AwaitingClientResponse = "AwaitingClientResponse",
  AwaitingLawyerResponse = "AwaitingLawyerResponse",
  ResolvedRelease = "ResolvedRelease",
  ResolvedRefund = "ResolvedRefund",
  Dismissed = "Dismissed",
}

export enum LawsuitStatus {
  Active = "Active",
  WaitingForJudgment = "WaitingForJudgment",
  Closed = "Closed",
}

export enum ReportReason {
  Fraud = "Fraud",
  Abuse = "Abuse",
  Harassment = "Harassment",
  IncompleteMission = "IncompleteMission",
  Unprofessional = "Unprofessional",
  Other = "Other",
}

export enum ReportStatus {
  Pending = "Pending",
  UnderReview = "UnderReview",
  Resolved = "Resolved",
  Dismissed = "Dismissed",
}

export enum RequestUrgency {
  Normal = "Normal",
  Urgent = "Urgent",
  VeryUrgent = "VeryUrgent",
}

export enum ServiceType {
  Consultation = "Consultation",
  Contract = "Contract",
  CompanyFormation = "CompanyFormation",
  Lawsuit = "Lawsuit",
  Base = "Base",
  IntellectualProperty = "IntellectualProperty",
  LegalTranslation = "LegalTranslation",
  DueDiligence = "DueDiligence",
  DebtCollection = "DebtCollection",
  Mediation = "Mediation",
  LegalReview = "LegalReview",
  Compliance = "Compliance",
}

export enum UserRole {
  Client = "Client",
  Lawyer = "Lawyer",
  Admin = "Admin",
}

export enum WithdrawalMethod {
  BankTransfer = "BankTransfer",
  VodafoneCash = "VodafoneCash",
  InstaPay = "InstaPay",
  Other = "Other",
}

export enum WithdrawalStatus {
  Pending = "Pending",
  Approved = "Approved",
  Rejected = "Rejected",
  Cancelled = "Cancelled",
  Paid = "Paid",
}
