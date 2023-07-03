import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  OneToMany,
} from "typeorm";
import { Staff } from "./Staff";

@Entity()
export class StaffProfile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => Staff, (staff) => staff.staffProfile)
  staff!: Staff;

  @OneToMany(
    () => StaffDocument,
    (staffDocument) => staffDocument.staffProfile,
    {
      cascade: true,
      eager: true,
      nullable: true,
    }
  )
  staffDocument!: StaffDocument[];

  @OneToMany(
    () => Education,
    (education) => education.staffProfile,
    {
      cascade: true,
      eager: true,
      nullable: true,
    }
  )
  education!: Education[];

  @OneToMany(
    () => WorkExperience,
    (workExperience) => workExperience.staffProfile,
    {
      cascade: true,
      eager: true,
      nullable: true,
    }
  )
  workExperience!: WorkExperience[];

  @OneToMany(
    () => NextOfKin,
    (nextOfKin) => nextOfKin.staffProfile,
    {
      cascade: true,
      eager: true,
      nullable: true,
    }
  )
  nextOfKin!: NextOfKin[];
}

@Entity()
export class NextOfKin extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;
  
  @Column()
  relationship!: string;


  @Column()
  contact!: string;

  @ManyToOne(
    () => StaffProfile,
    () => {
      onDelete: "CASCADE";
      onUpdate: "CASCADE";
    }
  )
  @JoinColumn()
  public staffProfile!: StaffProfile;

}

@Entity()
export class Education extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  institution!: string;

  @Column()
  qualification!: string;

  @Column()
  start_date!: string;

  @Column()
  end_date!: string;

  @ManyToOne(
    () => StaffProfile,
    () => {
      onDelete: "CASCADE";
      onUpdate: "CASCADE";
    }
  )
  @JoinColumn()
  public staffProfile!: StaffProfile;

}

@Entity()
export class WorkExperience extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  company!: string;

  @Column()
  position!: string;

  @Column()
  start_date!: string;

  @Column()
  end_date!: string;

  @ManyToOne(
    () => StaffProfile,
    () => {
      onDelete: "CASCADE";
      onUpdate: "CASCADE";
    }
  )
  @JoinColumn()
  public staffProfile!: StaffProfile;

}

@Entity()
export class StaffDocument extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  content!: string;

  @ManyToOne(
    () => StaffProfile,
    () => {
      onDelete: "CASCADE";
      onUpdate: "CASCADE";
    }
  )
  @JoinColumn()
  public staffProfile!: StaffProfile;

}


export const createStaffProfile = async (staff: number) => {
  const staffOBJ = await Staff.findOne({ where: { id: staff } });
  if (!staffOBJ) {
    throw new Error("Staff not found");
  }

  const staffProfile = new StaffProfile();
  staffProfile.staff = staffOBJ;

  await staffProfile.save();
  return staffProfile;
};


export const addStaffNextOfKin = async (
  staff: number,
  name: string,
  relationship: string,
  contact: string
) => {
  const staffOBJ = await Staff.findOne({ where: { id: staff } });
  if (!staffOBJ) {
    throw new Error("Staff not found");
  }

  
  if (!staffOBJ.staffProfile) {
    let staffProfile = await createStaffProfile(staff);
    staffOBJ.staffProfile = staffProfile;
    await staffOBJ.save();
  }


  const nextOfKin = new NextOfKin();
  nextOfKin.name = name;
  nextOfKin.relationship = relationship;
  nextOfKin.contact = contact;
  nextOfKin.staffProfile = staffOBJ.staffProfile;

  await nextOfKin.save();
  return nextOfKin;
}


export const addStaffEducation = async (
  staff: number,
  institution: string,
  qualification: string,
  start_date: string,
  end_date: string
) => {
  const staffOBJ = await Staff.findOne({ where: { id: staff } });
  if (!staffOBJ) {
    throw new Error("Staff not found");
  }

  
  let staffProfile = await StaffProfile.findOne({
    where: { id: staffOBJ.staffProfile.id },
  })
  
  if (!staffProfile) {
    staffProfile = await createStaffProfile(staff);
    staffOBJ.staffProfile = staffProfile;
    await staffOBJ.save();
  }

  const education = new Education();
  education.institution = institution;
  education.qualification = qualification;
  education.start_date = start_date;
  education.end_date = end_date;
  education.staffProfile = staffProfile;

  await education.save();
  return education;
}


export const addStaffWorkExperience = async (
  staff: number,
  company: string,
  position: string,
  start_date: string,
  end_date: string
) => {
  const staffOBJ = await Staff.findOne({ where: { id: staff } });
  if (!staffOBJ) {
    throw new Error("Staff not found");
  }

  
  let staffProfile = await StaffProfile.findOne({
    where: { id: staffOBJ.staffProfile.id },
  })
  
  if (!staffProfile) {
    staffProfile = await createStaffProfile(staff);
    // add staffProfile to staffOBJ
    staffOBJ.staffProfile = staffProfile;
    await staffOBJ.save();
  }

  const workExperience = new WorkExperience();
  workExperience.company = company;
  workExperience.position = position;
  workExperience.start_date = start_date;
  workExperience.end_date = end_date;
  workExperience.staffProfile = staffProfile;

  await workExperience.save();
  return workExperience;
}


export const addStaffDocument = async (
  staff: number,
  name: string,
  content: string
) => {
  const staffOBJ = await Staff.findOne({ where: { id: staff } });
  if (!staffOBJ) {
    throw new Error("Staff not found");
  }

  if (!staffOBJ.staffProfile) {
    let staffProfile = await createStaffProfile(staff);
    staffOBJ.staffProfile = staffProfile;
    await staffOBJ.save();
  }

  const staffDocument = new StaffDocument();
  staffDocument.name = name;
  staffDocument.content = content;
  staffDocument.staffProfile = staffOBJ.staffProfile;

  await staffDocument.save();
  return staffDocument;
}


export const getStaffProfile = async (staff: number) => {
  const staffOBJ = await Staff.findOne({ where: { id: staff } });
  if (!staffOBJ) {
    throw new Error("Staff not found");
  }

  if (staffOBJ.staffProfile === null) {
    const staffProfile = await createStaffProfile(staff);
    staffOBJ.staffProfile = staffProfile;
    await staffOBJ.save();
  }

  const staffProfile = await StaffProfile.findOne({
    where: { id: staffOBJ.staffProfile.id },
    relations: ["staffDocument", "education", "workExperience", "nextOfKin"],
  });
  

  return staffProfile;
}


export const deleteNextOfKin = async (id: number) => {
  const nextOfKin = await NextOfKin.findOne({ where: { id } });
  if (!nextOfKin) {
    throw new Error("Next of Kin not found");
  }

  await nextOfKin.remove();
  return nextOfKin;
}

export const deleteWorkExperience = async (id: number) => {
  const workExperience = await WorkExperience.findOne({ where: { id } });
  if (!workExperience) {
    throw new Error("Work Experience not found");
  }

  await workExperience.remove();
  return workExperience;
}


export const deleteQualification = async (id: number) => {
  const education = await Education.findOne({ where: { id } });
  if (!education) {
    throw new Error("Qualification not found");
  }

  await education.remove();
  return education;
}


// remove staff document
export const deleteStaffDocument = async (id: number) => {
  const staffDocument = await StaffDocument.findOne({ where: { id } });
  if (!staffDocument) {
    throw new Error("Staff Document not found");
  }

  await staffDocument.remove();
  return staffDocument;
}
