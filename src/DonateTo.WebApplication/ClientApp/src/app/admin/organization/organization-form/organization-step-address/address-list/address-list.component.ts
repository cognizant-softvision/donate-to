import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { AddressModel, ColumnItem, ContactModel } from 'src/app/shared/models';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { OrganizationSandbox } from '../../../organization.sandbox';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.less'],
})
export class AddressListComponent implements OnInit, OnDestroy {
  @Input() isEditOrganization: boolean;
  @Input() addresses: AddressModel[];
  @Output() deleteAddress: EventEmitter<AddressModel> = new EventEmitter<AddressModel>();
  @Output() isEditAddress = new EventEmitter();

  addressModel: AddressModel;
  contactModel: ContactModel;

  private subscriptions: Subscription[] = [];
  addressesToDelete: AddressModel[] = [];

  name = '';
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
  total = 0;
  pageSize = 10;
  pageIndex = 1;
  item: AddressModel;

  expandSet = new Set<number>();
  addressItemFormGroup = new FormGroup({
    itemsFormControl: new FormControl(),
  });

  listOfColumns: ColumnItem[] = [
    { name: '' },
    { name: 'Admin.Organization.OrganizationSteps.Address.Name' },
    { name: 'Admin.Organization.OrganizationSteps.Address.Street' },
    { name: 'Admin.Organization.OrganizationSteps.Address.PostalCode' },
    { name: 'Admin.Organization.OrganizationSteps.Address.Floor' },
    { name: 'Admin.Organization.OrganizationSteps.Address.Appartment' },
    { name: 'Admin.Organization.OrganizationSteps.Address.Country' },
    { name: 'Admin.Organization.OrganizationSteps.Address.State' },
    { name: 'Admin.Organization.OrganizationSteps.Address.City' },
    { name: 'Admin.Organization.OrganizationSteps.Address.AdditionalInformation' },
    { name: 'Admin.Action' },
  ];

  @ViewChild('modalContent') public modalContent: TemplateRef<any>;
  tplModal?: NzModalRef;

  constructor(
    private fb: FormBuilder,
    public organizationSandbox: OrganizationSandbox,
    private modal: NzModalService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.registerEvents();
  }

  ngOnDestroy(): void {
    this.unregisterEvents();
  }

  registerEvents() {
    this.subscriptions.push(
      this.organizationSandbox.deleteSuccess$.subscribe((success) => {
        if (success) {
          this.deleteAddress.emit(this.addressModel);
        }
      })
    );
  }

  private unregisterEvents() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

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
    if (this.isEditOrganization) {
      if (this.addresses.length < 2) {
        this.modal.warning({
          nzTitle: this.translateService.instant('Admin.Organization.OrganizationSteps.Address.Warning'),
          nzContent: this.translateService.instant(
            'Admin.Organization.OrganizationSteps.Address.OneAddressRemainWarningMessage'
          ),
        });
      } else {
        this.addressModel = item;
        this.organizationSandbox.deleteAddress(item);
      }
    }
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
