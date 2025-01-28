/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
    'jquery',
    'mage/template',
    'mage/validation/url',
    'Magento_Ui/js/modal/alert',
    'Magento_Ui/js/modal/confirm',
    'mage/translate',
    'Magento_Ui/js/modal/prompt',
    'mage/validation/validation',
    'jquery-ui-modules/widget',
    'mage/dataPost',
    'mage/dropdowns'
], function ($, mageTemplate, urlValidator, alert, confirm, $t) {
    'use strict';

    $.widget('mage.multipleWishlist', {
        options: {
            createTmplSelector: '#popup-tmpl',
            createTmplData: {
                formKey: $('input[name="form_key"]').val(),
                btnCloseClass: 'close',
                focusElement: '[data-role="prompt-field"]',
                popupWishlistBlockId: 'create-wishlist-block',
                popupWishlistFormId: 'create-wishlist-form',
                url: '#',
                isPublic: false,
                isEdit: false,
                translate: {
                    createNewWishlist: $t('Create New Wish List'),
                    editWishlist: $t('Edit wish list'),
                    wishListName: $t('Wish List Name'),
                    publicWishList: $t('Public Wish List'),
                    close: $t('Close'),
                    save: $t('Save'),
                    cancel: $t('Cancel')
                }
            },
            errorMsg: $.mage.__('We can\'t create the Wish List right now.'),
            spinnerClass: 'loading'
        },

        /**
         * @private
         */
        _create: function () {
            var _this = this; // in this case $(e.targer) is not the same as $(this)

            this.element.on('click', '[data-wishlist-create]', function () {
                var json = $(this).data('wishlist-create'),
                    url = json.url ? json.url : _this.options.createUrl,
                    isAjax = json.ajax;

                _this._showCreateWishlist(url, isAjax);

                return false;
            });

            // WCAG - trigger click on enter press
            this.element.on('keypress', '[data-action-keypress]', function (e) {
                var elem = $(this),
                    keyCode = e.keyCode || e.which,
                    ENTER_CODE = 13;

                if (keyCode === ENTER_CODE) {
                    e.preventDefault();
                    elem.trigger('click');
                }
            });
        },

        /**
         * @private
         */
        _destroy: function () {
            this.element.off('click', '[data-wishlist-create]');
            this.element.off('keypress', '[data-action-keypress]');
            this.unsetListeners();
        },

        /**
         * Show create wishlist popup block
         * @private
         * @param {String} url - create wishlist url
         * @param {Boolean} isAjax - if need to use ajax to call create wishlist url
         */
        _showCreateWishlist: function (url, isAjax) {
            this.createTmpl ? this.createTmpl.show() : this.createModal();
            $('#' + this.options.createTmplData.popupWishlistFormId).attr('action', url);
            $(this.options.createTmplData.focusElement).trigger('focus');
            this.createAjax = isAjax;
        },

        /**
         * Create modal instance
         */
        createModal: function () {
            this.initCreateTmpl();
            this.initValidation();
            this.setListeners();
        },

        /**
         * Initialized jQuery template for create wishlist popup block
         */
        initCreateTmpl: function () {
            this.createTmpl = $(mageTemplate(this.options.createTmplSelector, {
                data: this.options.createTmplData
            }));

            this.createTmpl.appendTo('body');
        },

        /**
         * Init form validation
         *
         * @param {Object} form
         */
        initValidation: function (form) {
            var $form = form ? $(form) : $('#' + this.options.createTmplData.popupWishlistFormId);

            $form.validation();
        },

        /**
         * Set listeners to modal
         *
         * @param {Object} form
         * @param {Object} closeBtn
         */
        setListeners: function (form, closeBtn) {
            var $form = form ? $(form) : $('#' + this.options.createTmplData.popupWishlistFormId),
                $closeBtn = closeBtn ? $(closeBtn) : $('.' + this.options.createTmplData.btnCloseClass);

            $closeBtn.on('click', this.clickCloseBtnHandler.bind(this));
            $form.on('invalid-form.validate', this.validateFormHandler.bind(this));
            $form.on('submit', this.submitFormHandler.bind(this));
        },

        /**
         * Unset listeners from modal.
         */
        unsetListeners: function () {
            var $form = $('#' + this.options.createTmplData.popupWishlistFormId),
                $closeBtn = $('.' + this.options.createTmplData.btnCloseClass);

            $closeBtn.off('click');
            $form.off('invalid-form.validate submit');
        },

        /**
         * Form validation handler
         *
         * @param {Object} event
         * @param {Object} validation
         */
        validateFormHandler: function (event, validation) {
            this.validation = validation;
        },

        /**
         * Close modal handler
         */
        clickCloseBtnHandler: function () {
            if (this.validation) {
                this.validation.resetForm();
            }

            this.createTmpl.hide();
        },

        /**
         * Form submit handler
         *
         * @param {Object} event
         */
        submitFormHandler: function (event) {
            var form = event.target;

            event.preventDefault();

            if (!this.validation || this.validation.valid()) {
                if (this.createAjax) {
                    this._createWishlistAjax(form);
                } else {
                    form.submit();
                }
            }
        },

        /**
         * Call create wishlist url using ajax, when response returns, call callback function
         * @private
         * @param {HTMLElement} form - create wishlist form
         */
        _createWishlistAjax: function (form) {
            var _form = $(form),
                _this = this;

            $.ajax({
                url: _form.attr('action'),
                type: 'post',
                cache: false,
                data: _form.serialize(),

                /**
                 * Before send.
                 */
                beforeSend: function () {
                    $('#' + _this.options.createTmplData.popupWishlistBlockId).addClass(_this.options.spinnerClass);
                },

                /**
                 * @param {Object} response
                 */
                success: function (response) {
                    if (typeof response['wishlist_id'] !== 'undefined') {
                        if (_this._callback) {
                            _this._callback(response['wishlist_id']);
                        }
                    } else if (typeof response.redirect !== 'undefined') {
                        urlValidator.redirect(response.redirect);
                    } else {
                        _this.createTmpl.hide();

                        alert({
                            content: _this.options.errorMsg
                        });
                    }
                }
            });
        }
    });

    // Extension for mage.wishlist - Move to Wish List
    $.widget('mage.multipleWishlist', $.mage.multipleWishlist, {
        options: {
            wishlistFormSelector: '#wishlist-view-form',
            formTmplSelector: '#form-tmpl-multiple',
            formTmplId: '#wishlist-hidden-form'
        },

        /**
         * @private
         */
        _create: function () {
            this._super();
            this.moveWishlistJson = this.element.find('[data-wishlist-move]').data('wishlist-move');
            this.element.on('click', '.item:has([data-wishlist-move-selected])', $.proxy(this._moveSelectedTo, this));
            this.element.on('click', '.item:has([data-wishlist-move-item])', $.proxy(this._moveItemTo, this));
        },

        /**
         * @private
         */
        _destroy: function () {
            this.element.off('click', '.item:has([data-wishlist-move-selected])');
            this.element.off('click', '.item:has([data-wishlist-move-item])');
            this._super();
        },

        /**
         * Move one wishlist item to another wishlist
         * @private
         * @param {jQuery.Event} e - Item in wishlist got clicked
         */
        _moveItemTo: function (e) {
            var json = $(e.currentTarget).find('[data-wishlist-move-item]').data('wishlist-move-item'),
                tmplJson = {
                    qty: this._getQty($(e.currentTarget)),
                    itemId: json.itemId,
                    url: this.moveWishlistJson.moveItemUrl,
                    'form_key': $('input[name="form_key"]').val()
                };

            if (json['new']) {
                this._moveItemToNew(tmplJson);
            } else {
                tmplJson.wishlistId = json.wishlistId;
                $(mageTemplate(this.options.formTmplSelector, {
                    data: tmplJson
                })).appendTo('body');
                $(this.options.formTmplId).trigger('submit');
            }
        },

        /**
         * Get wishlist item qty
         * @private
         * @param {jQuery} elem
         * @return {(int|null)} - Item qty
         */
        _getQty: function (elem) {
            var qty = elem.closest('div.product-item-info').find('input.qty');

            return qty.length ? qty[0].value : null;
        },

        /**
         * Move selected wishlist items to another wishlist
         * @private
         * @param {jQuery.Event} e - "Move to Wish List" button
         */
        _moveSelectedTo: function (e) {
            var json = $(e.currentTarget).find('[data-wishlist-move-selected]').data('wishlist-move-selected'),
                wishlistId = json.wishlistId,
                url;

            if (!this._itemsSelected()) {
                alert({
                    content: $.mage.__('Please select items to move.')
                });

                return;
            }

            if (json['new']) {
                this._moveSelectedToNew();
            } else {
                url = this.moveWishlistJson.moveSelectedUrl.replace(encodeURI('%wishlist_id%'), wishlistId);
                $(this.options.wishlistFormSelector).attr('action', url).trigger('submit');
            }
        },

        /**
         * Move selected wishlist items to a new wishlist: involve show create wishlist popup,
         * using ajax to get new wishlistId, and passing wishlistId to _callback, which submits to moveSelectedUrl
         * @private
         * @param {String} url - target url(can be move or copy)
         */
        _moveSelectedToNew: function (url) {
            /**
             * @param {*} wishlistId
             * @private
             */
            this._callback = function (wishlistId) {
                var _url = (url || this.moveWishlistJson.moveSelectedUrl)
                    .replace(encodeURI('%wishlist_id%'), wishlistId);

                $(this.options.wishlistFormSelector).attr('action', _url).trigger('submit');
            };
            this._showCreateWishlist(this.options.createUrl, true);
        },

        /**
         * Move one wishlist item to a new wishlist: involve show create wishlist popup,
         * using ajax to get new wishlistId, and passing wishlistId to _callback, which submits to moveItemUrl
         * @private
         * @param {Object} tmplJson - a closure variable holds itemId, qty, and url
         */
        _moveItemToNew: function (tmplJson) {
            /**
             * @param {*} wishlistId
             * @private
             */
            this._callback = function (wishlistId) {
                tmplJson.wishlistId = wishlistId;
                $(mageTemplate(this.options.formTmplSelector, {
                    data: tmplJson
                })).appendTo('body');
                $(this.options.formTmplId).trigger('submit');
            };
            this._showCreateWishlist(this.options.createUrl, true);
        },

        /**
         * Make sure at lease one item is selected
         * @private
         * @return {Boolean}
         */
        _itemsSelected: function () {
            return $(this.options.wishlistFormSelector).find('input.checkbox:checked').length ? true : false;
        }
    });

    // Extension for mage.wishlist - Copy to Wishlist
    $.widget('mage.multipleWishlist', $.mage.multipleWishlist, {
        /**
         * @private
         */
        _create: function () {
            this._super();
            this.copyWishlistJson = this.element.find('[data-wishlist-copy]').data('wishlist-copy');
            this.element.on('click', '.item:has([data-wishlist-copy-selected])', $.proxy(this._copySelectedTo, this));
            this.element.on('click', '.item:has([data-wishlist-copy-item])', $.proxy(this._copyItemTo, this));
        },

        /**
         * @private
         */
        _destroy: function () {
            this.element.off('click', '.item:has([data-wishlist-copy-selected])');
            this.element.off('click', '.item:has([data-wishlist-copy-item])');
            this._super();
        },

        /**
         * Copy one wishlist item to a different wishlist
         * @private
         * @param {jQuery.Event} e - Item in wishlist got clicked
         */
        _copyItemTo: function (e) {
            var json = $(e.currentTarget).find('[data-wishlist-copy-item]').data('wishlist-copy-item'),
                tmplJson = {
                    qty: this._getQty($(e.currentTarget)),
                    itemId: json.itemId,
                    url: this.copyWishlistJson.copyItemUrl,
                    'form_key': $('input[name="form_key"]').val()
                };

            if (json['new']) {
                this._copyItemToNew(tmplJson);
            } else {
                tmplJson.wishlistId = json.wishlistId;
                $(mageTemplate(this.options.formTmplSelector, {
                    data: tmplJson
                })).appendTo('body');
                $(this.options.formTmplId).trigger('submit');
            }
        },

        /**
         * Copy selected wishlist items to a different wishlist
         * @private
         * @param {jQuery.Event} e - copy to wishlist button
         */
        _copySelectedTo: function (e) {
            var json = $(e.currentTarget).find('[data-wishlist-copy-selected]').data('wishlist-copy-selected'),
                wishlistId = json.wishlistId,
                url;

            if (!this._itemsSelected()) {
                alert({
                    content: $.mage.__('Please select items to copy.')
                });

                return;
            }

            if (json['new']) {
                this._copySelectedToNew();
            } else {
                url = this.copyWishlistJson.copySelectedUrl.replace(encodeURI('%wishlist_id%'), wishlistId);
                $(this.options.wishlistFormSelector).attr('action', url).trigger('submit');
            }
        },

        /**
         * Copy selected wishlist items to a new wishlist
         * @private
         */
        _copySelectedToNew: function () {
            this._moveSelectedToNew(this.copyWishlistJson.copySelectedUrl);
        },

        /**
         * Copy one wishlist item to a new wishlist
         * @private
         * @param {Object} tmplJson - a closure variable holds itemId, qty, and url
         */
        _copyItemToNew: function (tmplJson) {
            this._moveItemToNew(tmplJson);
        }
    });

    // Extension for mage.wishlist - Delete Wishlist
    $.widget('mage.multipleWishlist', $.mage.multipleWishlist, {
        options: {
            deleteMsg: $.mage.__('Are you sure you want to delete your wish list? This action can\'t be undone.')
        },

        /**
         * @private
         */
        _create: function () {
            this._super();
            this.element.on('click', '[data-wishlist-delete]', $.proxy(this._deleteWishlist, this));
        },

        /**
         * @private
         */
        _destroy: function () {
            this.element.off('click', '[data-wishlist-delete]');
            this._super();
        },

        /**
         * Delete wishlist and redirect to first wishlist
         * @private
         * @param {jQuery.Event} e - "Delete Wish List" button
         */
        _deleteWishlist: function (e)  {
            var json;

            e.preventDefault();
            confirm({
                content: this.options.deleteMsg,
                actions: {
                    /**
                     * Confirm action.
                     */
                    confirm: function () {
                        json = $(e.currentTarget).data('wishlist-delete');
                        $.ajax({
                            url: json.deleteUrl.replace(encodeURI('%item%'), json.wishlistId),
                            data: {
                                'form_key': $('input[name="form_key"]').val()
                            },
                            type: 'post',
                            cache: false,

                            /**
                             * Success callback.
                             */
                            success: function () {
                                window.location.href = json.redirectUrl;
                            }
                        });
                    }
                }
            });
        }
    });

    $.widget('mage.promptEditWithList', $.mage.prompt, {
        options: {
            label: '',
            isPublicFieldLabel: '',
            isPublicFieldAttributeName: '',
            isPublicFieldChecked: false,
            hiddenFieldValue: ''
        },

        /**
         * @private
         */
        _create: function () {
            this._super();
            this.modal.find(this.options.modalContent).find('fieldset').append(this.getNoticeTemplate());
        },

        /**
         * @return {*|jQuery|HTMLElement}
         */
        getNoticeTemplate: function () {
            var template = $('<div class="field choice">' +
                '<input id="wishlist-public" type="checkbox" name="' + this.options.isPublicFieldAttributeName + '">' +
                '<label for="wishlist-public" class="label">' +
                '<span>' + this.options.isPublicFieldLabel + '</span>' +
                '</label>' +
                '<input name="form_key" type="hidden" value="' + this.options.hiddenFieldValue + '">' +
                '</div>');

            if (this.options.isPublicFieldChecked) {
                template.find('input[type = checkbox]').attr('checked', 'checked');
            }

            return template;
        }
    });

    // Extension for mage.wishlist - Edit Wishlist
    $.widget('mage.multipleWishlist', $.mage.multipleWishlist, {
        options: {
            editTmplData: {
                btnCloseClass: 'close',
                popupWishlistBlockId: 'edit-wishlist-block',
                popupWishlistFormId: 'edit-wishlist-form',
                isEdit: true
            }
        },

        /**
         * @private
         */
        _create: function () {
            this._super();
            this.element.on('click', '[data-wishlist-edit]', $.proxy(this._createEditWishlistModal, this));
        },

        /**
         * @private
         */
        _destroy: function () {
            this.element.off('click', '[data-wishlist-edit]');
            this._super();
        },

        /**
         * Edit wishlist
         * @private
         * @param {jQuery.Event} e - Edit wishlist button
         */
        _createEditWishlistModal: function (e)  {
            var json = $(e.currentTarget).data('wishlist-edit'),
                self = this;

            this.options.editTmplData.url = json.url;
            this.options.editTmplData.name = json.name;
            this.options.editTmplData.isPublic = json.isPublic;

            $.mage.promptEditWithList({
                title: json.title,
                value: this.options.editTmplData.name,
                label: $.mage.__('Wish List Name'),
                isPublicFieldLabel: $.mage.__('Public Wish List'),
                isPublicFieldAttributeName: 'visibility',
                isPublicFieldChecked: this.options.editTmplData.isPublic,
                hiddenFieldValue: json.formKey,
                attributesField: {
                    name: 'name',
                    'data-validate': '{required:true}',
                    maxlength: '255'
                },
                attributesForm: {
                    id: this.options.editTmplData.popupWishlistFormId,
                    action: this.options.editTmplData.url,
                    novalidate: 'novalidate'
                },
                buttons: [{
                    text: $.mage.__('Save'),

                    /**
                     * Click action.
                     */
                    click: function () {
                        $.ajax({
                            url: self.options.editTmplData.url,
                            data: $('#' + self.options.editTmplData.popupWishlistFormId).serialize(),
                            dataType: 'json',
                            method: 'post'
                        }).done(function (data) {
                            window.location.href = data.redirect;
                        });
                    }
                }, {
                    text: $.mage.__('Close'),

                    /**
                     * Click action.
                     */
                    click: function () {
                        this.closeModal();
                        this.modal.one(this.options.transitionEvent, function () {
                            this._remove();
                        }.bind(this, arguments));
                    }
                }]
            });

            return false;
        }
    });

    // Extension for mage.wishlist - Add Wishlist
    $.widget('mage.multipleWishlist', $.mage.multipleWishlist, {
        options: {
            wishlistLink: '.link-wishlist',
            splitBtnTmpl: '#split-btn-tmpl'
        },

        /**
         * @private
         */
        _create: function () {
            this._super();
            this.element.on('click', '[data-post-new-wishlist]', $.proxy(function (e) {
                var data = $(e.currentTarget).data('post-new-wishlist');

                $.extend(true, data, $(e.currentTarget).data('post'));
                this._addToNew(data);
            }, this));
            this._buildWishlistDropdown();
        },

        /**
         * @private
         */
        _destroy: function () {
            this.element.off('click', '[data-post-new-wishlist]');
            this._super();
        },

        /**
         * Add product to new wishlist
         * @private
         * @param {Object} data
         */
        _addToNew: function (data) {
            this._callback = $.proxy(function (wishlistId) {
                data.data['wishlist_id'] = wishlistId;
                $.mage.dataPost().postData(data);
            }, this);
            this._showCreateWishlist(this.options.createUrl, true);
        },

        /**
         * Build "Add to Wish List" dropdown list
         * @private
         */
        _buildWishlistDropdown: function () {
            if (this.options.wishlists && this.options.wishlists.length > 0) {
                $(this.options.wishlistLink).each($.proxy(function (index, e) {
                    var element = $(e),
                        buttonName = element.text().trim(),
                        generalParams = element.data('post'),
                        tmplData = {
                            wishlists: [],
                            generalParams: generalParams,
                            buttonName: buttonName
                        },
                        i, currentData, currentParams;

                    for (i = 0; i < this.options.wishlists.length; i++) {
                        currentData = $.extend({}, generalParams.data, {
                            'wishlist_id': this.options.wishlists[i].id
                        });
                        currentParams = {
                            action: generalParams.action,
                            data: currentData
                        };
                        tmplData.wishlists.push({
                            name: this.options.wishlists[i].name,
                            params: currentParams
                        });
                    }

                    if (this.options.canCreate) {
                        tmplData.wishlists.push({
                            newClass: 'new',
                            name: $.mage.__('Create New Wish List'),
                            params: generalParams
                        });
                    }
                    $(mageTemplate(this.options.splitBtnTmpl, {
                        data: tmplData
                    })).prependTo(element.parent());
                    element.parent().trigger('contentUpdated');
                    element.remove();
                }, this));
            }
        }
    });

    // Extension for mage.wishlist - Add Wishlist item to Gift Registry
    $.widget('mage.multipleWishlist', $.mage.multipleWishlist, {
        /**
         * @private
         */
        _create: function () {
            var _this = this;

            this._super();
            this.element.on('click', '[data-wishlist-to-giftregistry]', function () {
                var json = $(this).data('wishlist-to-giftregistry'),
                    tmplJson = {
                        item: json.itemId,
                        entity: json.entity,
                        url: json.url
                    };

                $(mageTemplate(_this.options.formTmplSelector, {
                    data: tmplJson
                })).appendTo('body');
                $(_this.options.formTmplId).trigger('submit');
            });
        },

        /**
         * @private
         */
        _destroy: function () {
            this.element.off('click', '[data-wishlist-to-giftregistry]');
            this._super();
        }
    });

    return $.mage.multipleWishlist;
});
