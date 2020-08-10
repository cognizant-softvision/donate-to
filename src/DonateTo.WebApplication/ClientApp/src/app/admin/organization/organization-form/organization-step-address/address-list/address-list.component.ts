import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { AddressModel, ColumnItem, ContactModel } from 'src/app/shared/models';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { OrganizationSandbox } from '../../../organization-sandbox';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css'],
})
export class AddressListComponent implements OnInit {
  @Input() isEditOrganization: boolean;
  @Input() addresses: AddressModel[];
  @Output() deleteAddress: EventEmitter<AddressModel> = new EventEmitter<AddressModel>();
  @Output() isEditAddress = new EventEmitter();

  addressModel: AddressModel;
  contactModel: ContactModel;

  street = '';
  postalCode = '';
  floor = '';
  appartment = '';
  country = 0;
  state = 0;
  city = 0;
  additionalInformation = '';
  addressId = 0;
  modalIsVisible = false;
  isOkLoading = false;
  isBranchEdit = false;
  itemIndex: number;

  expandSet = new Set<number>();
  addressItemFormGroup = new FormGroup({
    itemsFormControl: new FormControl(),
  });

  listOfColumns: ColumnItem[] = [
    { name: '' },
    { name: 'RequestDonation.DonationSteps.AddressStep.Street' },
    { name: 'RequestDonation.DonationSteps.AddressStep.PostalCode' },
    { name: 'RequestDonation.DonationSteps.AddressStep.Floor' },
    { name: 'RequestDonation.DonationSteps.AddressStep.Appartment' },
    { name: 'RequestDonation.DonationSteps.AddressStep.Country' },
    { name: 'RequestDonation.DonationSteps.AddressStep.State' },
    { name: 'RequestDonation.DonationSteps.AddressStep.City' },
    { name: 'RequestDonation.DonationSteps.AddressStep.AdditionalInformation' },
    { name: 'Admin.Action' },
  ];

  @ViewChild('modalContent') public modalContent: TemplateRef<any>;
  tplModal?: NzModalRef;

  constructor(
    private fb: FormBuilder,
    public organizationSandbox: OrganizationSandbox,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {}

  editAddress(item: AddressModel, index: number) {
    this.itemIndex = index;
    this.addressModel = item;
    this.contactModel = item.contact;
    this.isBranchEdit = true;
    this.addressId = item.id;
    this.showModal();
  }

  editedAddress(event) {
    this.hideModal();
    this.isEditAddress.emit({ editedAddress: event, itemIndex: this.itemIndex });
  }

  removeAddress(item: AddressModel) {
    this.addresses = this.addresses.filter((a) => a !== item);
    this.deleteAddress.emit(item);
  }

  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  handleCancel(): void {
    this.hideModal();
  }

  done() {
    this.hideModal();
  }

  showModal() {
    this.createTplModal(this.modalContent);
  }

  createTplModal(tplContent: TemplateRef<{}>): void {
    this.tplModal = this.modal.create({
      nzContent: tplContent,
      nzFooter: null,
      nzClosable: true,
      nzTitle: 'Branch',
      nzStyle: {
        top: '2em;',
      },
      nzWidth: '1000',
    });
  }

  hideModal() {
    this.tplModal?.destroy();
  }
}
